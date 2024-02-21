import React from "react";
import "./LocationContainer.css";
import { WeatherData } from "../../interfaces/WeatherData";
import { Location } from "../../interfaces/Location";
import DateTime from "../date-time/DateTime";
import { shouldIcnBeInverted } from "../../helpers/functions.helper";

interface LocationContainerProps {
  weatherData: WeatherData;
  toggleLocationToFav: (location: Location) => void;
  isFavorite: boolean;
  location: Location;
}
const LocationContainer: React.FC<LocationContainerProps> = ({
  weatherData,
  toggleLocationToFav,
  isFavorite,
  location,
}: LocationContainerProps) => {
  return (
    <div className="lc_location-container">
      <img
        src={
          location?.imgUrl
            ? location.imgUrl
            : require("../../assets/images/defaultBG.jpeg")
        }
        alt="location"
        className={`lc_location-img ${
          location.imgUrl ? "" : "lc_location-img_default"
        } `}
      />
      <div className="lc_corner-upper-left-overlay"></div>

      <div className="lc_weather-info-overlay">
        <div className="lc_location-header">
          <div className="lc_location-name">{location.formatted_address}</div>
          <DateTime lat={location.lat} lng={location.lng} />
        </div>
        <div className="lc_fav-icon">
          <img
            src={
              isFavorite ? "icons/favorite.png" : "icons/add-to-favorite.png"
            }
            width={60}
            alt="favorite"
            onClick={() => toggleLocationToFav(location)}
          />
        </div>
      </div>
      <div className="lc_bottom-overlay">
        <div className="lc_temprature-section">
          <div className="lc_temperature-text">
            {weatherData?.temperature && Math.round(weatherData?.temperature)}°
          </div>

          <img
            src={
              weatherData?.weatherIcon
                ? ` https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`
                : `/icons/unknown.png`
            }
            alt="weather-icon"
            className={`lc_weather-icon ${
              shouldIcnBeInverted(weatherData?.weatherIcon)
                ? "lc_weather-icon_inverted"
                : ""
            }`}
          />
        </div>
        <div className="lc_vertical-separator"></div>
        <div className="lc_add-info-section">
          <div className="lc-description-text">
            {weatherData && weatherData?.description}
          </div>
          <div className="lc_feels-like-text">
            {`Feels Like:
            ${weatherData?.feelsLike && Math.round(weatherData?.feelsLike)}°`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationContainer;
