// src/hooks/useCurrentDate.js

import { useState, useEffect } from "react";

const useCurrentDate = () => {
  const [time, setTime] = useState("");
  const [dateInfo, setDateInfo] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime(); // Call updateTime initially to set the time right away
    const intervalId = setInterval(updateTime, 1000); // Update the time every second

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.toLocaleString("id-ID", { weekday: "long" });
    const date = currentDate.getDate();
    const month = currentDate.toLocaleString("id-ID", { month: "long" });
    const year = currentDate.getFullYear();

    setDateInfo({ day, date, month, year });
  }, []);

  return { time, dateInfo };
};

export default useCurrentDate;
