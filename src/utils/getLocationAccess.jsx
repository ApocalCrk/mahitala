const getLocation = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.village || "Kota tidak ditemukan";
        const province = data.address.state || "Provinsi tidak ditemukan";
  
        return { city, province };
      } else {
        throw new Error('Data lokasi tidak ditemukan');
      }
    } catch (error) {
      throw new Error(`Terjadi kesalahan: ${error.message}`);
    }
  };
  
  export default getLocation;
  