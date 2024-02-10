import React from "react";
import "./LocationContainer.css";
import { WeatherData } from "../../pages/home-page/HomePage";

interface LocationContainerProps {
  imgUrl: string;
  locationName: string;
  weatherData: WeatherData;
}
export const LocationContainer: React.FC<LocationContainerProps> = ({
  imgUrl,
  locationName,
  weatherData,
}: LocationContainerProps) => {
  return (
    <div className="location-container">
      <img src={imgUrl} alt="" className="location-img" />
      <div className="weather-info">
        <div className="location-name">{locationName && locationName}</div>
        <div className="weather-description">
          {weatherData && weatherData?.description}
        </div>
        <div className="temperature">
          {weatherData?.temperature && Math.round(weatherData?.temperature)} °C
        </div>
        <div className="feels-like">
          Feels Like:
          {weatherData?.feelsLike && Math.round(weatherData?.feelsLike)}°C
        </div>
      </div>
    </div>
  );
};
