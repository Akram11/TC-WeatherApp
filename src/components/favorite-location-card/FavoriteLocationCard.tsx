import React, { useEffect } from "react";
import { Location } from "../../interfaces/Location";
import "./FavoriteLocationCard.css";
import { fetchWeatherData } from "../../services/api";
import { WeatherData } from "../../interfaces/WeatherData";

interface FavoriteLocationCardProps {
  location: Location;
}

const FavoriteLocationCard: React.FC<FavoriteLocationCardProps> = ({
  location,
}: FavoriteLocationCardProps) => {
  const [weatherData, setWeatherData] = React.useState<WeatherData>();
  useEffect(() => {
    fetchWeatherData(location.lat, location.lng)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error:", error));
  }, [location.lat, location.lng]);
  return (
    <div className="location-card">
      <div className="location-card-name">{location.formatted_address}</div>
      <div className="location-card-weather">
        <img
          width={20}
          src={`/icons/${weatherData?.weatherIcon}.png`}
          alt="weather-icon"
          className="location-card-weather-icon"
        />
        <div>
          {weatherData?.temperature && Math.round(weatherData?.temperature)}
          °C
        </div>
      </div>
    </div>
  );
};

export default FavoriteLocationCard;
