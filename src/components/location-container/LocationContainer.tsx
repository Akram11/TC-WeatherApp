import React from "react";
import "./LocationContainer.css";
import { WeatherData } from "../../interfaces/WeatherData";
import { Location } from "../../interfaces/Location";

interface LocationContainerProps {
  weatherData: WeatherData;
  toggleLocationToFav: (location: Location) => void;
  isFavorite: boolean;
  location: Location;
}
export const LocationContainer: React.FC<LocationContainerProps> = ({
  weatherData,
  toggleLocationToFav: addLocationToFav,
  isFavorite,
  location,
}: LocationContainerProps) => {
  return (
    <div className="location-container">
      <img src={location.imgUrl} alt="location" className="location-img" />
      <div className="weather-info-overlay">
        <div className="location-header">
          <div className="location-name">{location.formatted_address}</div>
          <div className="fav-icon">
            <img
              src={
                isFavorite ? "icons/favorite.png" : "icons/add-to-favorite.png"
              }
              width={60}
              alt="favorite"
              onClick={() => addLocationToFav(location)}
            />
          </div>
        </div>
        <div className="main-info">
          <img
            width={80}
            src={`/icons/${weatherData.weatherIcon}.png`}
            alt="weather-icon"
          />
          <div className="main-info-text">
            <div className="temperature">
              {weatherData?.temperature && Math.round(weatherData?.temperature)}
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
