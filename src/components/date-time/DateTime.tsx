import { useEffect, useState } from "react";
import "./DateTime.css";

const DateTimeComponent = ({ lat, lng }: { lat: number; lng: number }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const fetchTimeZone = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(
          Date.now() / 1000
        )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();
      const date = new Date();
      const utc = date.getTime() + date.getTimezoneOffset() * 60000;
      setCurrentDateTime(
        new Date(utc + 1000 * data.rawOffset + 1000 * data.dstOffset)
      );
    };

    fetchTimeZone();

    const timer = setInterval(() => {
      fetchTimeZone();
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [lat, lng]);

  const day = currentDateTime.getDate();
  const month = currentDateTime.toLocaleString("default", { month: "short" });
  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  return (
    <div className="date-time">{`${day} ${month}, ${hours % 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`}</div>
  );
};

export default DateTimeComponent;
