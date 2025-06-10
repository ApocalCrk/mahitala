import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Header from "./Header";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polygon,
  Tooltip,
  WMSTileLayer,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Webcam from "react-webcam";
import axios from "axios";

import { motion as m } from "framer-motion";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  calculateArea,
  capitalizeFirstLetter,
  calculateCentroid,
  API_URL_CLF,
  API_URL,
} from "../../utils/Constants";

import {
  getDataFieldByUserID,
  createDataField,
  deleteDataField,
  updateDataField,
} from "../../hooks/field_user/getDataField";

import { getCropData } from "../../hooks/crop/getCropData";

import Swal from "sweetalert2";

import { useUser } from "../../utils/userContext";
import {
  ArrowLeft,
  ArrowRight,
  Droplet,
  Home,
  Info,
  Leaf,
  MapPin,
  Menu,
  Sparkles,
  Trash,
  TrashIcon,
  Users2,
  X,
  XIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { getRekomendasiAI } from "../../hooks/forecast/getRekomendasiAI";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const videoConstraints = {
  width: 224,
  height: 224,
  facingMode: "environment",
};

const Canvas = ({ location, nowData }) => {
  const mapRef = useRef(null);
  const webcamRef = useRef(null);
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [cropData, setCropData] = useState([]);
  const [initialWeatherLoaded, setInitialWeatherLoaded] = useState(false);

  // data user
  const [weatherCache, setWeatherCache] = useState({});

  // UI state
  const [panelState, setPanelState] = useState("collapsed");
  const [activeSection, setActiveSection] = useState("weather");

  const [panelDesktop, setPanelDesktop] = useState("expanded");

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [information, setInformation] = useState(false);

  // field data
  const [polygons, setPolygons] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [soilType, setSoilType] = useState("");
  const [cropId, setCropId] = useState("");
  const [cropDate, setCropDate] = useState("");
  const [estimated_time, setEstimatedTime] = useState("");

  const [confirm, setConfirm] = useState(false);

  const [type, setType] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState(null);

  // For responsive design
  const [isMobile, setIsMobile] = useState(false);
  const [mapHeight, setMapHeight] = useState("100%");
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  // set initial data
  const yogyakartaPosition = [-7.797068, 110.370529];
  const nd = nowData.dataCuaca.weatherData;

  // camera
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  // auth
  const { isAuthenticated, setIsAuthenticated } = useUser();

  // Handle Soil Data
  const [resultData, setResultData] = useState(null);
  const [tempData, setTempData] = useState(null);

  // context menu
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    polygonIndex: null,
  });

  /***
   * =====================================================
   * Initial Map and Location
   * =====================================================
   */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (location && mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], 18);
    }
  }, [mounted, location]);
  /* ==================================================== */

  /***
   * =====================================================
   * Authentication and Responsive Design
   * =====================================================
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [panelState]);

  useEffect(() => {
    if (isMobile) {
      switch (panelState) {
        case "expanded":
          setMapHeight("30vh");
          break;
        case "peek":
          setMapHeight("50vh");
          break;
        case "collapsed":
          setMapHeight("98vh");
          break;
        default:
          setMapHeight("70vh");
      }
    }
  }, [panelState, isMobile]);

  const togglePanel = () => {
    if (panelState === "collapsed") {
      setPanelState("peek");
    } else if ((panelState === "peek") & isAuthenticated) {
      setPanelState("expanded");
    } else {
      setPanelState("collapsed");
    }
  };

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;

      e.preventDefault(); // Prevent scrolling
      const deltaY = e.touches[0].clientY - startY;
      const threshold = 50; // Minimum drag distance to trigger state change

      // Determine new panel state based on drag direction and current state
      if (deltaY > threshold && panelState !== "collapsed") {
        if (panelState === "expanded") {
          setPanelState("peek");
        } else if (panelState === "peek") {
          setPanelState("collapsed");
        }
        setStartY(e.touches[0].clientY); // Reset start position
      } else if (deltaY < -threshold && panelState !== "expanded") {
        if (panelState === "collapsed") {
          setPanelState("peek");
        } else if (panelState === "peek" && isAuthenticated) {
          setPanelState("expanded");
        }
        setStartY(e.touches[0].clientY); // Reset start position
      }
    },
    [isDragging, startY, panelState]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setStartY(0);
  }, []);

  // Mouse event handlers (for desktop compatibility)
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(e.clientY);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const threshold = 50;

      if (deltaY > threshold && panelState !== "collapsed") {
        if (panelState === "expanded") {
          setPanelState("peek");
        } else if (panelState === "peek") {
          setPanelState("collapsed");
        }
        setStartY(e.clientY);
      } else if (deltaY < -threshold && panelState !== "expanded") {
        if (panelState === "collapsed") {
          setPanelState("peek");
        } else if (panelState === "peek" && isAuthenticated) {
          setPanelState("expanded");
        }
        setStartY(e.clientY);
      }
    },
    [isDragging, startY, panelState]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setStartY(0);
  }, []);

  // Prevent body scroll when panel is being dragged
  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDragging]);
  /* ==================================================== */

  /***
   * =====================================================
   * Crop Data Fetching
   * =====================================================
   */
  useEffect(() => {
    getCropData().then((res) => {
      if (res) {
        const crops = res.map((crop) => ({
          id: crop.id_crop,
          label: crop.label,
          estimated_time: crop.estimated_time,
        }));
        setCropData(crops);
      }
    });
  }, []);
  /* ==================================================== */

  /***
   * =====================================================
   * Field Data Fetching & Deletion
   * =====================================================
   */
  useEffect(() => {
    getDataFieldByUserID().then((res) => {
      if (res) {
        const fieldData = res.map((field) => ({
          id: field.id_field,
          fieldName: field.nama_lahan,
          soilType: field.jenis_tanah,
          coords: JSON.parse(field.coords),
          cropId: field.id_tanaman,
          cropDate: field.tanggal_tanam,
          estimated_time: field.estimasi_panen,
        }));
        setPolygons(fieldData);
      }
    });
  }, []);

  const recommendationData = async (lat, lng, plants) => {
    setIsLoading(true);
    const [temperature, humidity, rainfall, rainfalltype] =
      await getRekomendasiAI({
        location: {
          latitude: lat,
          longitude: lng,
        },
      }).then((res) => {
        return [
          res[0].temperature,
          res[0].humidity,
          res[0].rainfall,
          res[0].sifat_hujan_rata,
        ];
      });

    const res = await axios.post(API_URL_CLF + "/api/soil/recommendation", {
      plants: plants,
      averageTemperature: temperature,
      averageHumidity: humidity,
      averageRainfall: rainfall,
      averageRainfallType: rainfalltype,
    });

    if (res) {
      setRecommendationResult(res.data);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handleDeleteLahan = (id) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      showCancelButton: true,
      text: "Apakah Anda yakin ingin menghapus lahan ini?",
      icon: "warning",
      confirmButtonText: "Ya, hapus!",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDataField(id).then((res) => {
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Lahan berhasil dihapus.",
              showConfirmButton: false,
              timer: 1500,
            });
            setPolygons((prev) => prev.filter((poly) => poly.id !== id));
            setContextMenu({ visible: false, x: 0, y: 0, polygonIndex: null });
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Terjadi kesalahan saat menghapus lahan.",
            });
          }
        });
      }
    });
  };

  const EditLahan = (index) => {
    const selectedPolygon = polygons[index];
    setFieldName(selectedPolygon.fieldName);
    setSoilType(selectedPolygon.soilType);
    setCropId(selectedPolygon.cropId.toString());
    setCropDate(selectedPolygon.cropDate.split("T")[0]);
    setEstimatedTime(selectedPolygon.estimated_time.split("T")[0]);
    setPolygonPoints(selectedPolygon.coords);
    setType("edit");
    setPanelState("peek");
    setActiveSection("field");
    setPanelDesktop("expanded");
    if (isMobile && panelState !== "expanded") {
      setPanelState("peek");
      setActiveSection("field");
    }
  };

  const handleEditLahan = (index) => {
    const selectedPolygon = polygons[index];
    const id = selectedPolygon.id;
    Swal.fire({
      title: "Konfirmasi Edit",
      showCancelButton: true,
      text: "Apakah Anda yakin ingin mengedit lahan ini?",
      icon: "warning",
      confirmButtonText: "Ya, edit!",
      confirmButtonColor: "#6C7D41",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id_field: id,
          nama_lahan: fieldName,
          jenis_tanah: soilType,
          id_tanaman: cropId,
          coords: JSON.stringify(polygonPoints),
          luas_lahan: JSON.stringify(calculateArea(polygonPoints)),
          tanggal_tanam: cropDate,
          estimasi_panen: estimated_time,
        };
        updateDataField(data).then((res) => {
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Lahan berhasil diedit.",
              showConfirmButton: false,
              timer: 1500,
            });
            setPolygons((prev) =>
              prev.map((poly) =>
                poly.id === id
                  ? {
                      ...poly,
                      ...{
                        id: id,
                        fieldName: fieldName,
                        soilType: soilType,
                        coords: polygonPoints,
                        cropId: cropId,
                        cropDate: cropDate,
                        estimated_time: estimated_time,
                      },
                    }
                  : poly
              )
            );
            setPolygonPoints([]);
            setFieldName("");
            setSoilType("");
            setCropId("");
            setCropDate("");
            setEstimatedTime("");

            setType("add");
            setActiveSection("weather");
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Terjadi kesalahan saat mengedit lahan.",
            });
          }
        });
      }
    });
  };
  /* ==================================================== */

  /***
   * =====================================================
   * Map Click Handler
   * =====================================================
   */
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPolygonPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
        setPanelDesktop("expanded");
        setActiveSection("field");
        if (isMobile && panelState !== "expanded") {
          setPanelState("peek");
          setActiveSection("field");
        }
      },
    });
    return null;
  };

  useEffect(() => {
    const fetchSoilDataOnPolygonChange = async () => {
      if (polygonPoints.length > 2) {
        const centroid = calculateCentroid(polygonPoints);
        await fetchSoilData(centroid[0], centroid[1]);
      }
    };

    fetchSoilDataOnPolygonChange();
  }, [confirm]);

  const fetchSoilData = async (lat, lng) => {
    try {
      const [wrb, ph, soc, cfvo] = await Promise.all([
        fetch(
          `https://rest.isric.org/soilgrids/v2.0/classification/query?lon=${lng}&lat=${lat}&number_classes=1`
        ),
        fetch(
          `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lng}&lat=${lat}&property=phh2o&depth=0-5cm`
        ),
        fetch(
          `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lng}&lat=${lat}&property=soc&depth=0-5cm`
        ),
        fetch(
          `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lng}&lat=${lat}&property=cfvo&depth=0-5cm`
        ),
      ]);

      if (!wrb.ok || !ph.ok || !soc.ok || !cfvo.ok)
        throw new Error("Gagal mengambil data tanah");

      const [wrbData, phData, socData, cfvoData] = await Promise.all([
        wrb.json(),
        ph.json(),
        soc.json(),
        cfvo.json(),
      ]);

      const newLayerData = {
        jenis_tanah: wrbData,
        ph_tanah: phData,
        kandungan_organik: socData,
        ketersedian_air: cfvoData,
      };

      const data = {
        ph:
          newLayerData?.ph_tanah?.properties.layers[0].depths[0].values.mean /
          10,
        soil: newLayerData?.jenis_tanah?.wrb_class_name,
        organic_matter:
          newLayerData?.kandungan_organik?.properties.layers[0].depths[0].values
            .mean / 10,
        water_content:
          newLayerData?.ketersedian_air?.properties.layers[0].depths[0].values
            .mean / 10,
      };

      await handleAnalyze(JSON.stringify(data));
      setTempData(data);

      return newLayerData;
    } catch (err) {
      console.error("Error fetching soil data:", err);
      return null;
    }
  };

  const handleAddPolygon = () => {
    if (
      polygonPoints.length > 2 &&
      fieldName.trim() &&
      soilType.trim() &&
      cropId.trim() &&
      cropDate
    ) {
      setPolygons([
        ...polygons,
        {
          fieldName: fieldName,
          soilType: soilType,
          coords: polygonPoints,
          cropId: cropId,
          estimated_time: estimated_time,
        },
      ]);
      let data = {
        nama_lahan: fieldName,
        jenis_tanah: soilType,
        id_tanaman: cropId,
        coords: JSON.stringify(polygonPoints),
        luas_lahan: JSON.stringify(calculateArea(polygonPoints)),
        tanggal_tanam: cropDate,
        estimasi_panen: estimated_time,
      };
      createDataField(data);
      setPolygonPoints([]);
      setFieldName("");
      setSoilType("");
      setCropId("");
      setCropDate("");
      setEstimatedTime("");
      setResult(null);

      setActiveSection("weather");

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Lahan berhasil ditambahkan! Silakan tunggu beberapa saat untuk memuat data cuaca",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        if (isMobile) {
          setPanelState("collapsed");
        }
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Ada Masalah",
        text: "Silakan isi semua data lahan dan pastikan titik cukup untuk membentuk poligon",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  /* ==================================================== */

  /***
   * =====================================================
   * Weather Data Fetching & Processing
   * =====================================================
   */
  const processWeatherData = (rawData) => {
    // Check if we have weather data array
    if (
      !rawData.data ||
      !rawData.data[0] ||
      !rawData.data[0].cuaca ||
      rawData.data[0].cuaca.length === 0
    ) {
      return null;
    }

    // Get the first set of hourly forecasts (typically current day)
    const hourlyForecasts = rawData.data[0].cuaca[0];

    if (!hourlyForecasts || hourlyForecasts.length === 0) {
      return null;
    }

    // Calculate averages
    let totalTemp = 0;
    let totalHumidity = 0;
    let totalWindSpeed = 0;
    let totalWeatherCode = 0;
    let count = 0;

    // Direction counts for most common wind direction
    const windDirections = {};
    let currentForecast = null;

    // Get the latest forecast (closest to current time)
    const now = new Date();
    let closestTimeDiff = Infinity;

    hourlyForecasts.forEach((forecast) => {
      // Calculate averages
      totalTemp += forecast.t;
      totalHumidity += forecast.hu;
      totalWindSpeed += forecast.ws;
      totalWeatherCode += forecast.weather;
      count++;

      // Count wind directions
      const windDirection = forecast.wd;
      windDirections[windDirection] = (windDirections[windDirection] || 0) + 1;

      // Find the closest forecast to current time
      if (forecast.local_datetime) {
        const forecastDate = new Date(forecast.local_datetime);
        const timeDiff = Math.abs(forecastDate - now);
        if (timeDiff < closestTimeDiff) {
          closestTimeDiff = timeDiff;
          currentForecast = forecast;
        }
      }
    });

    // Find most common wind direction
    let mostCommonDirection = "";
    let maxCount = 0;
    Object.entries(windDirections).forEach(([direction, dirCount]) => {
      if (dirCount > maxCount) {
        maxCount = dirCount;
        mostCommonDirection = direction;
      }
    });

    // Create processed data structure that matches what the component expects
    return {
      lokasi: rawData.lokasi,
      params: {
        t: {
          value: [{ value: Math.round(totalTemp / count) }],
        },
        hu: {
          value: [{ value: Math.round(totalHumidity / count) }],
        },
        ws: {
          value: [{ value: (totalWindSpeed / count).toFixed(1) }],
        },
        wr: {
          value: [{ text: mostCommonDirection }],
        },
        weather: {
          value: [
            {
              value: Math.round(totalWeatherCode / count),
              text: currentForecast
                ? currentForecast.weather_desc
                : "Tidak tersedia",
            },
          ],
        },
        datetime: {
          value: [
            {
              text: currentForecast
                ? new Date(currentForecast.local_datetime).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : "hari ini",
            },
          ],
        },
      },
    };
  };

  const fetchWeatherData = async (centroidPosition, cacheKey) => {
    if (
      weatherCache[cacheKey] &&
      (weatherCache[cacheKey].data || weatherCache[cacheKey].isLoading)
    ) {
      return;
    }

    setWeatherCache((prev) => ({
      ...prev,
      [cacheKey]: { isLoading: true },
    }));

    try {
      const lat = centroidPosition[0];
      const lon = centroidPosition[1];
      const response = await fetch(
        `https://cuaca.bmkg.go.id/api/df/v1/forecast/coord?lon=${lon}&lat=${lat}`
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data cuaca");
      }

      const rawData = await response.json();

      const processedData = processWeatherData(rawData);

      setWeatherCache((prev) => ({
        ...prev,
        [cacheKey]: {
          isLoading: false,
          data: processedData,
          error: null,
        },
      }));
    } catch (err) {
      console.error("Error fetching weather data:", err);

      setWeatherCache((prev) => ({
        ...prev,
        [cacheKey]: {
          isLoading: false,
          data: null,
          error: err.message,
        },
      }));
    }
  };

  const formatArea = (area) => {
    if (!area) return "Menghitung...";
    return (
      <>
        {area.hectares.toFixed(4)} hektar
        <br />({area.squareMeters.toFixed(2)} m²)
      </>
    );
  };

  useEffect(() => {
    if (!initialWeatherLoaded && polygons.length > 0) {
      polygons.forEach((poly) => {
        const centroidPosition = calculateCentroid(poly.coords);
        const cacheKey = `${centroidPosition[0].toFixed(6)}_${centroidPosition[1].toFixed(6)}`;

        if (!weatherCache[cacheKey]) {
          fetchWeatherData(centroidPosition, cacheKey);
        }
      });
      setInitialWeatherLoaded(true);
    }
  }, [initialWeatherLoaded, polygons]);
  /* ==================================================== */

  /***
   * =====================================================
   * Camera and File Upload Handler
   * =====================================================
   */
  const handlePredict = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(API_URL_CLF + "/api/soil/predict", formData);

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnalyze = async (data) => {
    if (data) {
      const jsonData = JSON.parse(data);

      try {
        const res = await axios.post(API_URL_CLF + "/api/soil/analyze", {
          ph: jsonData.ph,
          soil: jsonData.soil,
          organic_matter: jsonData.organic_matter,
          water_content: jsonData.water_content,
        });

        setResultData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const combinedPlants = () => {
    const plants = [];

    if (resultData && resultData.recommended_plants) {
      plants.push(...resultData.recommended_plants);
    }

    if (
      result &&
      result.recommendation &&
      result.recommendation.suitable_crops
    ) {
      plants.push(...result.recommendation.suitable_crops);
    }

    return [...new Set(plants)];
  };

  const captureFromCamera = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
    setPreview(imageSrc);
    handlePredict(file);
  }, [webcamRef]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    handlePredict(file);
  };
  /* ==================================================== */

  /***
   * =====================================================
   * Render Sections (Weather, Field, Summary)
   * =====================================================
   */
  const renderWeatherSection = () => (
    <div className="p-4 md:pt-2 pt-4">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#6C7D41]">Cuaca Saat Ini</h2>
          <div className="text-3xl">
            <img src={nd?.image} alt="Weather Icon" height={50} width={50} />
          </div>
        </div>

        <p className="text-base font-medium text-gray-700 mt-2">
          {nd?.weather_desc || "Memuat..."}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">🌡️</span>
              <div>
                <p className="text-xs text-gray-500">Suhu</p>
                <p className="font-bold text-lg">{nd?.t || "-"}°C</p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">💧</span>
              <div>
                <p className="text-xs text-gray-500">Kelembaban</p>
                <p className="font-bold text-lg">{nd?.hu || "-"}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">💨</span>
              <div>
                <p className="text-xs text-gray-500">
                  Angin <sub>km/j</sub>
                </p>
                <p className="font-bold text-lg">{nd?.ws || "-"}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">🧭</span>
              <div>
                <p className="text-xs text-gray-500">Arah</p>
                <p className="font-bold text-lg">{nd?.wd || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Diperbarui: {dateNow}
        </div>
      </div>
    </div>
  );

  const renderFieldSection = () => (
    <div className="p-4 md:p-2 pt-4 overflow-y-auto">
      {polygonPoints.length > 0 && (
        <div className="bg-[#6C7D4110] backdrop-blur-sm rounded-lg p-3 shadow-sm mb-2">
          <div className="flex justify-between gap-2">
            <p className="text-sm font-medium text-green-800">
              Titik: {polygonPoints.length}
            </p>
            {calculateArea(polygonPoints) && (
              <p className="text-xs text-green-700">
                {formatArea(calculateArea(polygonPoints))}
              </p>
            )}
          </div>
          <div className="flex mt-4">
            <button
              onClick={() => {
                setPolygonPoints([]);
                setConfirm(false);
                setPanelState("collapsed");
              }}
              className="text-xs bg-red-100 text-red-600 py-1 px-3 rounded-full"
            >
              Batal dan Hapus
            </button>
            {!confirm && (
              <button
                onClick={async () => {
                  if (polygonPoints.length > 2) {
                    setConfirm(true);
                    setPanelState("expanded");
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Ada Masalah",
                      text: "Silakan buat poligon dengan minimal 3 titik.",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                }}
                className="text-xs bg-[#6C7D41] text-white py-1 px-3 rounded-full ml-2"
              >
                Kunci Lahan
              </button>
            )}
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lahan
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#6C7D41] focus:ring-1 focus:ring-[#6C7D41] focus:outline-none"
              placeholder="Contoh: Lahan Jagung"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Tanah
            </label>
            <input
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#6C7D41] focus:ring-1 focus:ring-[#6C7D41] focus:outline-none mb-2"
              readOnly={true}
              placeholder="Silahkan Foto Tanah"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              onClick={() => setOpen(true)}
            />
            <button
              onClick={() => setOpen(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm shadow-md w-full"
            >
              Ambil Gambar
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Tanaman
            </label>
            <div className="w-full max-w-md mx-auto">
              {resultData && result && soilType && (
                <div className="mb-4 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-full">
                      {resultData.soil_parameters && (
                        <>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-medium text-blue-600">
                              Karakteristik Tanah
                            </p>
                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                              {result.label}
                            </span>
                          </div>

                          <div className="bg-white p-3 rounded shadow-sm mb-3">
                            <p className="text-xs text-gray-700 font-medium mb-2">
                              Klasifikasi Ilmiah:{" "}
                              {resultData.soil_parameters.soil_class}
                            </p>
                            <div className="grid grid-cols-3 gap-2 mb-2">
                              <div className="flex flex-col items-center bg-blue-50 p-2 rounded">
                                <div className="flex items-center mb-1">
                                  <Sparkles
                                    size={14}
                                    className="text-blue-600 mr-1"
                                  />
                                  <span className="text-xs text-gray-600">
                                    pH
                                  </span>
                                </div>
                                <p className="text-sm font-bold text-blue-600">
                                  {resultData.soil_parameters.ph}
                                </p>
                              </div>
                              <div className="flex flex-col items-center bg-blue-50 p-2 rounded">
                                <div className="flex items-center mb-1">
                                  <Leaf
                                    size={14}
                                    className="text-blue-600 mr-1"
                                  />
                                  <span className="text-xs text-gray-600">
                                    Organik
                                  </span>
                                </div>
                                <p className="text-sm font-bold text-blue-600">
                                  {resultData.soil_parameters.organic_matter}%
                                </p>
                              </div>
                              <div className="flex flex-col items-center bg-blue-50 p-2 rounded">
                                <div className="flex items-center mb-1">
                                  <Droplet
                                    size={14}
                                    className="text-blue-600 mr-1"
                                  />
                                  <span className="text-xs text-gray-600">
                                    Air
                                  </span>
                                </div>
                                <p className="text-sm font-bold text-blue-600">
                                  {resultData.soil_parameters.water_content}%
                                </p>
                              </div>
                            </div>
                            <small className="text-xs text-gray-500 italic">
                              Jika data pH, Kandungan Organik, dan Ketersedian
                              Air memiliki nilai 0 maka data tidak tersedia di
                              area tersebut
                            </small>
                          </div>
                        </>
                      )}

                      {/* Combined Recommendations Section */}
                      {(resultData?.recommended_plants ||
                        (result?.recommendation?.suitable_crops &&
                          result?.soilType)) && (
                        <div className="bg-white p-3 rounded shadow-sm mb-3">
                          {(resultData?.recommended_plants ||
                            result?.recommendation?.suitable_crops) && (
                            <>
                              <div className="mb-2 flex items-center justify-between gap-1">
                                <p className="text-xs font-medium text-gray-600">
                                  Tanaman yang direkomendasikan
                                </p>
                                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                  {combinedPlants().length}
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {combinedPlants().map((plant, index) => (
                                  <span
                                    key={index}
                                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                                  >
                                    {capitalizeFirstLetter(plant)}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      <div className="bg-white p-3 rounded shadow-sm mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Info size={16} className="text-gray-600" />
                          <p className="text-xs font-medium text-gray-600">
                            Umpan Balik Tanaman Berdasarkan Cuaca{" "}
                            {isLoading && "(Mohon Tunggu)"}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          {isLoading ? (
                            <div className="animate-pulse">
                              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                          ) : (
                            <p
                              className="text-xs text-gray-500"
                              dangerouslySetInnerHTML={{
                                __html: recommendationResult.response,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <select
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#6C7D41] focus:ring-1 focus:ring-[#6C7D41] focus:outline-none"
              value={cropId}
              onClick={(e) => {
                e.stopPropagation();
                if (!confirm) {
                  Swal.fire({
                    icon: "warning",
                    title: "Peringatan",
                    text: "Silakan kunci lahan terlebih dahulu sebelum memilih tanaman.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }}
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedCropLabel = cropData.find(
                  (crop) => crop.id == selectedValue
                )?.label;

                if (
                  resultData &&
                  result &&
                  result.recommendation &&
                  !combinedPlants().includes(selectedCropLabel)
                ) {
                  Swal.fire({
                    title: "Peringatan",
                    text: "Tanaman yang dipilih tidak sesuai dengan rekomendasi. Apakah Anda yakin ingin melanjutkan?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya, lanjutkan",
                    cancelButtonText: "Tidak",
                  }).then((swalResult) => {
                    if (swalResult.isConfirmed) {
                      setCropId(selectedValue);
                      const selectedCrop = cropData.find(
                        (crop) => crop.id === parseInt(selectedValue)
                      );
                      if (selectedCrop && cropDate) {
                        const estimatedDate = new Date(cropDate);
                        estimatedDate.setDate(
                          estimatedDate.getDate() +
                            parseInt(selectedCrop.estimated_time)
                        );
                        setEstimatedTime(
                          estimatedDate.toISOString().split("T")[0]
                        );
                      } else {
                        setEstimatedTime("");
                      }
                    } else {
                      setCropId("");
                    }
                  });
                } else {
                  setCropId(selectedValue);
                  const selectedCrop = cropData.find(
                    (crop) => crop.id === parseInt(selectedValue)
                  );
                  if (selectedCrop && cropDate) {
                    const estimatedDate = new Date(cropDate);
                    estimatedDate.setDate(
                      estimatedDate.getDate() +
                        parseInt(selectedCrop.estimated_time)
                    );
                    setEstimatedTime(estimatedDate.toISOString().split("T")[0]);
                  } else {
                    setEstimatedTime("");
                  }
                }
              }}
            >
              <option value="" disabled>
                Pilih Tanaman
              </option>
              {confirm &&
                cropData.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {capitalizeFirstLetter(crop.label)}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Tanam
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#6C7D41] focus:ring-1 focus:ring-[#6C7D41] focus:outline-none"
              value={cropDate}
              onChange={(e) => {
                setCropDate(e.target.value);
                const selectedCrop = cropData.find(
                  (crop) => crop.id === parseInt(cropId)
                );
                if (selectedCrop) {
                  const estimatedDate = new Date(e.target.value);
                  estimatedDate.setDate(
                    estimatedDate.getDate() +
                      parseInt(selectedCrop.estimated_time)
                  );
                  setEstimatedTime(estimatedDate.toISOString().split("T")[0]);
                }
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimasi Panen
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#6C7D41] focus:ring-1 focus:ring-[#6C7D41] focus:outline-none"
              value={estimated_time}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />
          </div>

          {estimated_time && (
            <div className="text-xs text-gray-500">
              Estimasi Panen:{" "}
              {new Date(estimated_time).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </div>
          )}

          <button
            onClick={() => {
              if (type === "add") {
                handleAddPolygon();
              } else if (type === "edit") {
                handleEditLahan(contextMenu.polygonIndex);
              }
            }}
            disabled={
              polygonPoints.length < 3 ||
              !fieldName.trim() ||
              !cropId.trim() ||
              !cropDate
            }
            className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center
            ${
              polygonPoints.length < 3 ||
              !fieldName.trim() ||
              !soilType.trim() ||
              !cropId.trim() ||
              !cropDate
                ? "bg-gray-300"
                : "bg-gradient-to-r from-[#6C7D41] to-[#8a9d52]"
            }`}
          >
            {type === "add" ? "Simpan Lahan" : "Perbarui Lahan"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSummarySection = () => (
    <div className="p-4 md:p-2 pt-4">
      <div className="rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-[#6C7D41] mb-3">Lahan Saya</h2>

        {polygons.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Anda belum memiliki lahan</p>
          </div>
        ) : (
          <div className="space-y-3 h-[300px] overflow-y-auto">
            {polygons.map((poly, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm cursor-pointer"
                onClick={() => {
                  mapRef.current.setView(calculateCentroid(poly.coords), 18, {
                    animate: true,
                    duration: 0.5,
                  });
                }}
                onContextMenu={(e) => handleContextMenu(e, index)}
              >
                <div className="font-medium text-[#6C7D41]">
                  {poly.fieldName}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <div>
                    Tanaman:{" "}
                    {capitalizeFirstLetter(
                      cropData.find((crop) => poly.cropId == crop.id)?.label ||
                        "Tidak Diketahui"
                    )}
                  </div>
                  <div>Luas: {formatArea(calculateArea(poly.coords))}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  /* ==================================================== */

  /***
   * =====================================================
   * Context Menu
   * =====================================================
   */
  const handleContextMenu = (e, index) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      polygonIndex: index,
    });
  };

  const handleClickOutside = () => {
    setContextMenu({
      ...contextMenu,
      visible: false,
    });
  };
  /* ==================================================== */

  /***
   * =====================================================
   * Tile Layer Function BMKG
   * =====================================================
   */
  const [latestRadarLayer, setLatestRadarLayer] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL + "/api/radar-info")
      .then((response) => {
        const data = response.data;

        if (data && data.wmts && data.wmts.latest && data.wmts.latest.layer) {
          const layerName = data.wmts.latest.layer;
          setLatestRadarLayer(layerName);
        } else {
          throw new Error("Struktur data JSON dari API tidak sesuai.");
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data layer radar:", err);
        if (err.response) {
          setError(
            `Gagal terhubung ke BMKG. Server merespons dengan status ${err.response.status}`
          );
        } else if (err.request) {
          setError(
            "Tidak ada respons dari server backend. Pastikan server.py sudah berjalan."
          );
        } else {
          setError(err.message);
        }
      });
    // ---------------------------------------------
  }, []);

  const wmsBaseUrl = "https://radar.bmkg.go.id/sidarmageoserver";

  const wmsParams = useMemo(
    () => ({
      layers: latestRadarLayer,
      format: "image/png",
      transparent: true,
      styles: "CMAX_dBZ",
      version: "1.1.0",
    }),
    [latestRadarLayer]
  );
  /* ==================================================== */

  return (
    <>
      {/* Header on Mobile */}
      {isMobile && <Header />}

      <div className="h-screen relative flex" onClick={handleClickOutside}>
        {/* Desktop sidebar */}
        {!isMobile && panelDesktop === "expanded" && (
          <m.div
            className="z-[999] bg-white p-5 rounded-xl shadow-md w-[500px] border border-gray-200 h-screen overflow-y-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="flex mb-4 border-b border-gray-100">
              {isAuthenticated && (
                <>
                  <button
                    className={`flex-1 py-3 text-center text-sm font-medium relative overflow-hidden transition-all duration-300 ${
                      activeSection === "weather"
                        ? "text-[#6C7D41] scale-105"
                        : "text-gray-500 hover:text-[#6C7D41]"
                    }`}
                    onClick={() => setActiveSection("weather")}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {/* Weather icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16H5.5z" />
                      </svg>
                      Cuaca & Lahan
                    </span>
                    {activeSection === "weather" && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#6C7D41] rounded-t-lg transform transition-transform duration-300"></span>
                    )}
                  </button>

                  <button
                    className={`flex-1 py-3 text-center text-sm font-medium relative overflow-hidden transition-all duration-300 ${
                      activeSection === "field"
                        ? "text-[#6C7D41] scale-105"
                        : "text-gray-500 hover:text-[#6C7D41]"
                    }`}
                    onClick={() => setActiveSection("field")}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {/* Field/Plant icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z"
                          clipRule="evenodd"
                        />
                        <path d="M10 7a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1V8a1 1 0 011-1z" />
                      </svg>
                      Tambah Lahan
                    </span>
                    {activeSection === "field" && (
                      <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#6C7D41] rounded-t-lg transform transition-transform duration-300"></span>
                    )}
                  </button>
                </>
              )}
            </div>
            {activeSection === "weather" && renderWeatherSection()}
            {activeSection === "field" && (
              <div className="mb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold text-[#6C7D41]">
                    {type === "add" ? "Tambah Lahan Baru" : "Edit Lahan"}
                  </h1>
                  {type === "edit" && (
                    <button
                      className="text-sm text-red-500 hover:text-red-700"
                      onClick={() => {
                        setType("add");
                        setFieldName("");
                        setSoilType("");
                        setCropId("");
                        setCropDate("");
                        setEstimatedTime("");
                        setPolygonPoints([]);
                      }}
                    >
                      Batal
                    </button>
                  )}
                </div>
                {renderFieldSection()}
              </div>
            )}

            <span className="block h-8" />

            {!isMobile & isAuthenticated
              ? activeSection === "weather" && renderSummarySection()
              : null}
          </m.div>
        )}

        {/* context menu */}
        {!isMobile && contextMenu.visible && (
          <div
            className="z-[9999] fixed bg-white shadow-lg rounded-lg p-2 border border-gray-200"
            style={{
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
            }}
          >
            <div className="flex flex-col gap-1 min-w-[150px]">
              <button
                className="flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-md w-full text-left transition-colors"
                onClick={() =>
                  handleDeleteLahan(polygons[contextMenu.polygonIndex].id)
                }
              >
                <Trash className="h-4 w-4" /> Hapus
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full text-left transition-colors"
                onClick={() =>
                  mapRef.current.setView(
                    calculateCentroid(
                      polygons[contextMenu.polygonIndex].coords
                    ),
                    18,
                    { animate: true, duration: 0.5 }
                  )
                }
              >
                <ArrowRight className="h-4 w-4" /> Pindah
              </button>
              <button
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full text-left transition-colors"
                onClick={() => EditLahan(contextMenu.polygonIndex)}
                onContextMenu={(e) => e.preventDefault()}
              >
                <ArrowLeft className="h-4 w-4" /> Edit
              </button>
              <hr className="my-1 border-gray-200" />
              <button
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full text-left transition-colors"
                onClick={() =>
                  setContextMenu({ ...contextMenu, visible: false })
                }
              >
                <X className="h-4 w-4" /> Tutup
              </button>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div
          className="relative w-full transition-all duration-300 ease-in-out"
          style={{ height: isMobile ? mapHeight : "100%" }}
        >
          <MapContainer
            center={yogyakartaPosition}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
            zoomControl={false}
          >
            <LayersControl position={!isMobile ? "topright" : "bottomleft"}>
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </LayersControl.BaseLayer>

              {latestRadarLayer && (
                <LayersControl.Overlay
                  checked
                  name="Radar Cuaca BMKG (Terbaru)"
                >
                  <WMSTileLayer
                    key={latestRadarLayer}
                    url={wmsBaseUrl}
                    params={wmsParams}
                    opacity={0.5}
                    attribution="BMKG"
                    className="scale-100"
                  />
                </LayersControl.Overlay>
              )}
            </LayersControl>

            {!isAuthenticated
              ? isMobile && (
                  <div className="absolute bottom-32 rounded-lg shadow-md z-[9999] m-2">
                    <div
                      className="flex items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <span className="block sm:inline">
                        <strong className="font-bold">Peringatan!</strong> Akses
                        data terbatas, silahkan masuk untuk mendapatkan akses
                        penuh.
                      </span>
                    </div>
                  </div>
                )
              : null}

            {!isAuthenticated
              ? !isMobile && (
                  <div className="absolute top-5 rounded-lg shadow-md z-[9999] m-2">
                    <div
                      className="flex items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <span className="block sm:inline">
                        <strong className="font-bold">Peringatan!</strong> Akses
                        data terbatas, silahkan masuk untuk mendapatkan akses
                        penuh.
                      </span>
                    </div>
                  </div>
                )
              : null}

            {location && (
              <Marker
                position={[location.latitude, location.longitude]}
                icon={L.divIcon({
                  className: "user-location-marker",
                  html: `
                  <div class="relative">
                    <div class="absolute -top-1 -left-1 w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                    <div class="relative z-10 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>
                `,
                  iconSize: [30, 30],
                  iconAnchor: [15, 15],
                })}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <div className="text-center">
                    <div className="font-bold text-blue-800">Lokasi Anda</div>
                  </div>
                </Tooltip>
              </Marker>
            )}

            {isAuthenticated ? !confirm && <MapClickHandler /> : null}

            {polygonPoints.length > 0 && (
              <Polygon
                positions={polygonPoints}
                pathOptions={{
                  color: "#6C7D41",
                  fillOpacity: 0.2,
                  weight: 3,
                }}
              >
                <Marker
                  position={calculateCentroid(polygonPoints)}
                  icon={L.divIcon({
                    className: "marker-icon",
                    html: `
                      <div class="relative">
                        <div class="absolute -top-1 -left-1 w-8 h-8 bg-green-500 rounded-full opacity-30 animate-ping"></div>
                        <div class="relative z-10 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center border-2 border-white">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                        </div>
                      </div>
                    `,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15],
                  })}
                />
                <Popup className="text-center">
                  <div className="font-bold text-green-800">Lahan Baru</div>
                  <div className="text-sm">
                    Luas: {formatArea(calculateArea(polygonPoints))}
                  </div>
                </Popup>
              </Polygon>
            )}

            {/* Poligon yang sudah ada */}
            {polygons.map((poly, index) => {
              const centroidPosition = calculateCentroid(poly.coords);
              const cacheKey = `${centroidPosition[0].toFixed(
                6
              )}_${centroidPosition[1].toFixed(6)}`;
              const cachedData = weatherCache[cacheKey];

              const weatherData = cachedData?.data || null;
              const isLoading = cachedData?.isLoading || false;
              const error = cachedData?.error || null;

              return (
                <Polygon
                  key={index}
                  positions={poly.coords}
                  pathOptions={{
                    color: "#6C7D41",
                    fillOpacity: 0.15,
                    weight: 2,
                    opacity: 0.8,
                    fillPattern: {
                      patternShape: { shape: "diamond", width: 4, height: 4 },
                      patternFillColor: "#6C7D41",
                      patternStrokeColor: "#6C7D41",
                      patternStrokeWidth: 1,
                      patternSpacing: 6,
                    },
                  }}
                  eventHandlers={{
                    click: () => {
                      mapRef.current.setView(centroidPosition, 18, {
                        animate: true,
                        duration: 0.5,
                      });
                      fetchSoilData(centroidPosition[0], centroidPosition[1]);
                    },
                  }}
                >
                  <Popup
                    className="weather-soil-popup"
                    maxWidth="300"
                    closeButton
                    autoClose={false}
                    closeOnClick={false}
                    onClose={() => {
                      setWeatherCache((prev) => ({
                        ...prev,
                        [cacheKey]: { ...prev[cacheKey], isLoading: false },
                      }));
                    }}
                  >
                    <div className="text-sm max-w-xs">
                      {/* Header */}
                      <div className="mb-3">
                        <h3 className="text-base font-semibold text-blue-800">
                          {poly.fieldName}
                        </h3>
                        <div className="w-12 h-0.5 bg-blue-500 mt-1"></div>
                      </div>

                      {/* Weather */}
                      <div className="mb-4 bg-white rounded-md border border-blue-100 shadow-sm">
                        <div className="bg-blue-50 px-2 py-1.5 border-b border-blue-100">
                          <div className="flex items-center text-xs font-medium text-blue-700">
                            <svg
                              className="w-3.5 h-3.5 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                              />
                            </svg>
                            Cuaca
                          </div>
                        </div>

                        <div className="p-2">
                          {isLoading ? (
                            <div className="flex justify-center items-center py-3">
                              <div className="animate-spin h-3 w-3 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
                              <span className="ml-2 text-gray-500 text-xs">
                                Memuat...
                              </span>
                            </div>
                          ) : error ? (
                            <div className="text-center text-red-500 py-2 text-xs">
                              Gagal memuat data cuaca
                            </div>
                          ) : weatherData ? (
                            <>
                              <div className="text-center mb-2">
                                <div className="text-2xl font-bold text-blue-700">
                                  {weatherData?.params?.t?.value[0]?.value ||
                                    "-"}
                                  °
                                </div>
                                <div className="text-xs text-gray-600">
                                  {weatherData?.params?.weather?.value[0]
                                    ?.text || "-"}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="flex items-center space-x-2 rounded p-1.5">
                                  <div className="bg-blue-100 p-1 rounded">
                                    <svg
                                      className="w-3.5 h-3.5 text-blue-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="text-gray-500">
                                      Kelembaban
                                    </div>
                                    <div className="font-semibold text-gray-700">
                                      {weatherData?.params?.hu?.value[0]
                                        ?.value || "-"}
                                      %
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 rounded p-1.5">
                                  <div className="bg-blue-100 p-1 rounded">
                                    <svg
                                      className="w-3.5 h-3.5 text-blue-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M9 16h.01M15 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="text-gray-500">Angin</div>
                                    <div className="font-semibold text-gray-700">
                                      {weatherData?.params?.ws?.value[0]
                                        ?.value || "-"}{" "}
                                      km/j
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right text-xs text-gray-400 mt-1">
                                Diperbarui: {dateNow}
                              </div>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                fetchWeatherData(centroidPosition, cacheKey)
                              }
                              className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs font-medium"
                            >
                              Muat Data
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Soil Section */}
                      <div className="mb-4 bg-white rounded-md border border-amber-100 shadow-sm">
                        <div className="bg-amber-50 px-2 py-1.5 border-b border-amber-100">
                          <div className="flex items-center text-xs font-medium text-amber-700">
                            <svg
                              className="w-3.5 h-3.5 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Tanah
                          </div>
                        </div>
                        <div className="p-2 grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-2 rounded p-1.5">
                            <div className="bg-amber-100 p-1 rounded">
                              <svg
                                className="w-3.5 h-3.5 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-gray-500">pH Tanah</div>
                              <div className="font-semibold text-gray-700">
                                {tempData?.ph?.toFixed(1) || "-"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 rounded p-1.5">
                            <div className="bg-amber-100 p-1 rounded">
                              <svg
                                className="w-3.5 h-3.5 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-gray-500">Organik</div>
                              <div className="font-semibold text-gray-700">
                                {tempData?.organic_matter?.toFixed(1) || "-"}%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 rounded p-1.5">
                            <div className="bg-amber-100 p-1 rounded">
                              <svg
                                className="w-3.5 h-3.5 text-amber-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 10h18M3 14h18m-9 4h9m-9-4H3m0 0v4m0-4V6m0 8v4m0-4H3m18 0v4m0-4V6m0 8h-9"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-gray-500">Kadar Air</div>
                              <div className="font-semibold text-gray-700">
                                {tempData?.water_content?.toFixed(1) || "-"}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Field Details */}
                      <div className="bg-white rounded-md border border-green-100 shadow-sm mt-2">
                        <div className="bg-green-50 px-2 py-1.5 border-b border-green-100">
                          <div className="flex items-center text-xs font-medium text-green-700">
                            <svg
                              className="w-3.5 h-3.5 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Detail Lahan
                            <span className="ml-auto text-xs">
                              {poly.cropId
                                ? capitalizeFirstLetter(
                                    cropData.find(
                                      (crop) => poly.cropId == crop.id
                                    )?.label || "Tidak Diketahui"
                                  )
                                : "Tidak Diketahui"}
                            </span>
                          </div>
                        </div>
                        <div className="p-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="text-gray-500">Luas</div>
                            <div className="font-semibold text-gray-700">
                              {formatArea(calculateArea(poly.coords))}
                            </div>
                          </div>
                        </div>
                        <div className="p-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="text-gray-500">Tanggal Tanam</div>
                            <div className="font-semibold text-gray-700">
                              {poly.cropDate || poly.tanggal_tanam
                                ? new Date(
                                    poly.cropDate || poly.tanggal_tanam
                                  ).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                  })
                                : "Tidak Diketahui"}
                            </div>
                          </div>
                        </div>
                        <div className="p-2 text-xs">
                          <div className="flex items-center justify-between">
                            <div className="text-gray-500">Estimasi Panen</div>
                            <div className="font-semibold text-gray-700">
                              {poly.estimated_time
                                ? new Date(
                                    poly.estimated_time
                                  ).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                  })
                                : "Tidak Diketahui"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Polygon>
              );
            })}
          </MapContainer>

          {!isMobile && (
            <div className="absolute bottom-6 md:right-2 space-y-2 z-[999]">
              {/* Navigation Header panel for Desktop */}
              <div className="leaflet-control bg-white rounded-xl shadow-xl overflow-hidden w-[320px]">
                <div
                  className="bg-gradient-to-r from-[#6C7D41] to-[#8BA350] text-white p-3 font-semibold text-sm flex justify-between items-center cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="flex items-center">
                    {isMenuOpen ? (
                      <X className="h-4 w-4 mr-2" />
                    ) : (
                      <Menu className="h-4 w-4 mr-2" />
                    )}
                    Menu Navigasi
                  </span>
                </div>
                {isMenuOpen && (
                  <div className="p-4 flex flex-col gap-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `flex items-center gap-3 transition-colors duration-200 py-1 px-2 rounded-md hover:bg-gray-50 hover:text-[#6C7D41] ${
                          isActive
                            ? "bg-gray-50 text-[#6C7D41]"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Halaman Utama</span>
                    </NavLink>
                    <NavLink
                      to="/peta"
                      className={({ isActive }) =>
                        `flex items-center gap-3 transition-colors duration-200 py-1 px-2 rounded-md hover:bg-gray-50 hover:text-[#6C7D41] ${
                          isActive
                            ? "bg-gray-50 text-[#6C7D41]"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">Peta Interaktif</span>
                    </NavLink>
                    <NavLink
                      to="/forum"
                      className={({ isActive }) =>
                        `flex items-center gap-3 transition-colors duration-200 py-1 px-2 rounded-md hover:bg-gray-50 hover:text-[#6C7D41] ${
                          isActive
                            ? "bg-gray-50 text-[#6C7D41]"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <Users2 className="h-5 w-5" />
                      <span className="font-medium">Forum Diskusi</span>
                    </NavLink>
                    <NavLink
                      to="/tentang-kami"
                      className={({ isActive }) =>
                        `flex items-center gap-3 transition-colors duration-200 py-1 px-2 rounded-md hover:bg-gray-50 hover:text-[#6C7D41] ${
                          isActive
                            ? "bg-gray-50 text-[#6C7D41]"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <Info className="h-5 w-5" />
                      <span className="font-medium">Tentang Kami</span>
                    </NavLink>
                  </div>
                )}
              </div>

              <div className="leaflet-control bg-white rounded-xl shadow-xl overflow-hidden w-[320px]">
                <div
                  className="bg-gradient-to-r from-[#6C7D41] to-[#8BA350] text-white p-3 font-semibold text-sm flex justify-between items-center cursor-pointer"
                  onClick={() => setInformation(!information)}
                >
                  <span className="flex items-center">
                    {information ? (
                      <X className="h-4 w-4 mr-2" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    Informasi Peta
                  </span>
                </div>
                {information && (
                  <div className="p-4">
                    {isAuthenticated && (
                      <div className="border-b border-gray-200 pb-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 font-medium">
                            Total Lahan:
                          </span>
                          <span className="text-sm font-bold">
                            {polygons.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 font-medium">
                            Total Luas:
                          </span>
                          <span className="text-sm font-bold">
                            {formatArea(
                              polygons.reduce(
                                (acc, poly) => {
                                  const area = calculateArea(poly.coords);
                                  return {
                                    hectares: acc.hectares + area.hectares,
                                    squareMeters:
                                      acc.squareMeters + area.squareMeters,
                                  };
                                },
                                { hectares: 0, squareMeters: 0 }
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-sm font-semibold mb-2 text-gray-700">
                        Informasi BMKG Radar Cuaca:
                      </div>
                      <div className="space-y-2">
                        {/* Keterangan: Hujan Sangat Ringan */}
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: "#00BFFF" }}
                          ></div>
                          <div className="ml-2 text-xs text-gray-600">
                            <span className="font-bold">15 - 25 dBZ:</span>{" "}
                            Hujan Sangat Ringan
                          </div>
                        </div>

                        {/* Keterangan: Hujan Ringan */}
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: "#008000" }}
                          ></div>
                          <div className="ml-2 text-xs text-gray-600">
                            <span className="font-bold">25 - 35 dBZ:</span>{" "}
                            Hujan Ringan
                          </div>
                        </div>

                        {/* Keterangan: Hujan Sedang */}
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: "#FFFF00" }}
                          ></div>
                          <div className="ml-2 text-xs text-gray-600">
                            <span className="font-bold">35 - 45 dBZ:</span>{" "}
                            Hujan Sedang
                          </div>
                        </div>

                        {/* Keterangan: Hujan Lebat */}
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: "#FFA500" }}
                          ></div>
                          <div className="ml-2 text-xs text-gray-600">
                            <span className="font-bold">45 - 55 dBZ:</span>{" "}
                            Hujan Lebat
                          </div>
                        </div>

                        {/* Keterangan: Hujan Sangat Lebat */}
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: "#FF0000" }}
                          ></div>
                          <div className="ml-2 text-xs text-gray-600">
                            <span className="font-bold">55 - 65 dBZ:</span>{" "}
                            Hujan Sangat Lebat
                          </div>
                        </div>

                        {/* Keterangan: Hujan Ekstrem / Hujan Es */}
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: "#FF00FF" }}
                          ></div>
                          <div className="ml-2 text-xs text-gray-600">
                            <span className="font-bold"> 65 dBZ:</span> Hujan
                            Ekstrem / Badai
                          </div>
                        </div>

                        <small className="text-xs text-gray-500 mt-2 block">
                        dBZ (decibel-Zeppelin) adalah satuan yang digunakan
                        untuk mengukur intensitas refleksi sinyal radar dari
                        partikel di atmosfer, seperti tetesan air atau es.
                      </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isMobile && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-[999]">
              <button
                onClick={() => {
                  setPanelDesktop(
                    panelDesktop === "collapsed" ? "expanded" : "collapsed"
                  );
                }}
                className="bg-white w-8 h-12 rounded-tr-xl rounded-br-xl shadow-lg flex items-center justify-center text-[#6C7D41]"
              >
                <span className="text-xl">
                  {panelDesktop === "collapsed" ? (
                    <ArrowRight />
                  ) : (
                    <ArrowLeft />
                  )}
                </span>
              </button>
            </div>
          )}

          {/* floating context  */}
          {isMobile
            ? isAuthenticated && (
                <div
                  className={`absolute bottom-20 right-4 flex flex-col gap-2 z-[1000] ${panelState === "expanded" ? "hidden" : ""}`}
                >
                  <button
                    onClick={() => {
                      setPanelState(
                        panelState === "collapsed" ? "peek" : "collapsed"
                      );
                      setActiveSection("summary");
                    }}
                    className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-[#6C7D41]"
                  >
                    <span className="text-xl">📊</span>
                  </button>
                  <button
                    onClick={() => {
                      setPanelState(
                        panelState === "collapsed" ? "peek" : "collapsed"
                      );
                      setActiveSection("field");
                    }}
                    className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-[#6C7D41]"
                  >
                    <span className="text-xl">🌱</span>
                  </button>
                  <button
                    onClick={() => {
                      setPanelState(
                        panelState === "collapsed" ? "peek" : "collapsed"
                      );
                      setActiveSection("weather");
                    }}
                    className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-[#6C7D41]"
                  >
                    <span className="text-xl">🌤️</span>
                  </button>
                </div>
              )
            : null}

          {/* floating button to direct to now location */}
          <div className="absolute bottom-20 md:bottom-4 left-4 z-[999]">
            <button
              onClick={() => {
                if (location) {
                  mapRef.current.setView(
                    [location.latitude, location.longitude],
                    18,
                    { animate: true, duration: 0.5 }
                  );
                } else {
                  alert("Lokasi Anda tidak ditemukan");
                }
              }}
              className="bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-[#6C7D41]"
            >
              <div className="relative z-10 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  width="16"
                  height="16"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Info panel - Bottom sliding panel for mobile */}
        {isMobile && (
          <div
            className={`fixed bottom-4 left-0 right-0 bg-white  transition-transform duration-300 ease-in-out z-[1000] rounded-t-3xl`}
            style={{
              transform:
                panelState === "collapsed"
                  ? "translateY(95%)"
                  : panelState === "peek"
                    ? "translateY(0)"
                    : "translateY(0)",
              height:
                (panelState === "expanded") & isAuthenticated ? "85vh" : "50vh",
              touchAction: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Drag handle */}
            <div
              className="h-8 w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              onClick={togglePanel}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full transition-colors duration-200 hover:bg-gray-400"></div>
            </div>

            {/* Section tabs */}
            <div className="flex px-2 border-b border-gray-100">
              <button
                className={`flex-1 py-2 text-center text-sm font-medium relative ${activeSection === "weather" ? "text-[#6C7D41]" : "text-gray-400"}`}
                onClick={() => setActiveSection("weather")}
              >
                <span>Cuaca</span>
                {activeSection === "weather" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C7D41]"></span>
                )}
              </button>
              {isAuthenticated && (
                <>
                  <button
                    className={`flex-1 py-2 text-center text-sm font-medium relative ${activeSection === "field" ? "text-[#6C7D41]" : "text-gray-400"}`}
                    onClick={() => setActiveSection("field")}
                  >
                    <span>Tambah Lahan</span>
                    {activeSection === "field" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C7D41]"></span>
                    )}
                  </button>
                  <button
                    className={`flex-1 py-2 text-center text-sm font-medium relative ${activeSection === "summary" ? "text-[#6C7D41]" : "text-gray-400"}`}
                    onClick={() => setActiveSection("summary")}
                  >
                    <span>Lahan Saya</span>
                    {activeSection === "summary" && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C7D41]"></span>
                    )}
                  </button>
                </>
              )}
            </div>

            <div className="overflow-y-auto pb-safe h-[calc(100vh-250px)]">
              {activeSection === "weather" && renderWeatherSection()}
              {activeSection === "field" && renderFieldSection()}
              {activeSection === "summary" && renderSummarySection()}
            </div>
          </div>
        )}

        {/* Camera Layout */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 z-[99999]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setOpen(false)}
              >
                <XIcon className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Deteksi Tipe Tanah & Rekomendasi Tanaman
              </h2>

              <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
                <div className="flex flex-col items-center gap-4 w-full lg:w-2/3">
                  {preview && (
                    <div className="flex flex-col items-center w-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-xl border shadow-lg"
                      />
                    </div>
                  )}
                  {!preview && (
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      mirrored={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      className="rounded-xl border shadow-lg"
                    />
                  )}

                  {!preview ? (
                    <button
                      onClick={captureFromCamera}
                      className="bg-[#6C7D41] text-white font-semibold w-full py-2 px-5 rounded-lg shadow transition"
                    >
                      📸 Ambil Gambar
                    </button>
                  ) : (
                    <button
                      onClick={() => setPreview(null)}
                      className="bg-red-400 text-white font-semibold w-full py-2 px-5 rounded-lg shadow transition"
                    >
                      <span className="flex justify-center">
                        <TrashIcon className="w-5 h-5 mr-2" /> Ambil Ulang
                        Gambar
                      </span>
                    </button>
                  )}

                  <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium w-full px-4 py-2 rounded-lg border cursor-pointer transition justify-center flex">
                    📁 Unggah Gambar
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {result && (
                  <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-green-700">
                      Hasil Prediksi Tanah
                    </h3>
                    <p className="text-gray-700 mt-2">
                      <strong>Tipe Tanah:</strong> {result.label}
                    </p>
                    <p className="text-gray-700">
                      <strong>Ketepatan:</strong>{" "}
                      {(result.confidence * 100).toFixed(2)}%
                    </p>
                    {result.warning && (
                      <p className="text-red-600 font-medium">
                        ⚠️ {result.warning}
                      </p>
                    )}
                    {result.high_confidence && (
                      <p className="text-green-600 font-medium">
                        ✅ {result.high_confidence}
                      </p>
                    )}

                    <p className="mt-3 text-green-800 font-medium">
                      🌱 Tanaman yang cocok:{" "}
                      {result.recommendation.suitable_crops.map(
                        (crop, index) => (
                          <span key={index}>
                            {crop}
                            {index <
                              result.recommendation.suitable_crops.length - 1 &&
                              ", "}
                          </span>
                        )
                      )}
                    </p>
                    <button
                      className="bg-[#6C7D41] text-white font-semibold w-full py-2 px-5 rounded-lg shadow transition mt-4"
                      onClick={() => {
                        setSoilType(result.label);
                        const centroidPosition =
                          calculateCentroid(polygonPoints);
                        recommendationData(
                          centroidPosition[0],
                          centroidPosition[1],
                          combinedPlants()
                        );
                        setOpen(false);
                      }}
                    >
                      Simpan Hasil
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Canvas;
