import React from "react";
import "./LocationContainer.css";
import { WeatherData } from "../../pages/home-page/HomePage";
// import x from '../../../public/assets/icons/01d.png';

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
      <img src={imgUrl} alt="location" className="location-img" />
      <div className="weather-info-overlay">
        <div className="location-name">{locationName && locationName}</div>
        <div className="main-info">
          <img
            width={80}
            src={`/icons/${weatherData.weatherIcon}.png`}
            alt="weather-icon"
          />
          <div className="main-info-text">
            <div className="temperature">
              {weatherData?.temperature && Math.round(weatherData?.temperature)}{" "}
              °C
            </div>
            <div className="weather-description">
              {weatherData && weatherData?.description}
            </div>

            <div className="feels-like">
              Feels Like:
              {weatherData?.feelsLike && Math.round(weatherData?.feelsLike)}°C
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
