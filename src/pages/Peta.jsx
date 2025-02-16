import React, { useState, useEffect } from "react";

import getLocation from "../utils/getLocationAccess";

import Canvas from "../components/peta/Canvas";

const Peta = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const loc = await getLocation(latitude, longitude);
            loc.latitude = latitude;
            loc.longitude = longitude;
            setLocation(loc);
          } catch (error) {
            setError(error.message);
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation tidak didukung oleh browser ini.");
    }
  }, []);

  return <Canvas location={location} error={error} />;
};

export default Peta;
