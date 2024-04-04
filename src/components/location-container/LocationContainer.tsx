import React, { useEffect, useState } from "react";
import "./LocationContainer.css";
import { WeatherData } from "../../interfaces/WeatherData";
import { Location } from "../../interfaces/Location";
import DateTime from "../date-time/DateTime";
import { shouldIcnBeInverted } from "../../helpers/functions.helper";
import { fetchWeatherData } from "../../services/api";

interface LocationContainerProps {
  toggleLocationToFav: (location: Location) => void;
  isFavorite: boolean;
  location: Location;
}

const defaultBG = require("../../assets/images/defaultBG.jpeg");
const favoriteIcon = "icons/favorite.png";
const addToFavoriteIcon = "icons/add-to-favorite.png";
const unknownWeatherIcon = "/icons/unknown.png";

const LocationContainer: React.FC<LocationContainerProps> = ({
  toggleLocationToFav,
  isFavorite,
  location,
}: LocationContainerProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hasError, setHasError] = useState(false);
  const locationImgSrc = location?.imgUrl ? location.imgUrl : defaultBG;
  const weatherIconSrc = weatherData?.weatherIcon
    ? `https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`
    : unknownWeatherIcon;

  useEffect(() => {
    if (location?.lat && location?.lng) {
      fetchWeatherData(location.lat, location.lng)
        .then((data: any) => {
          if (data) {
            setWeatherData(data);
            setHasError(false);
          } else {
            setHasError(true);
          }
        })
        .catch(() => {
          setHasError(true);
        });
    }
  }, [location]);

  if (hasError) {
    return <div>Error: Unable to fetch weather data</div>;
  }

  return (
    <div className="lc_location-container">
      <img
        src={locationImgSrc}
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
            src={isFavorite ? favoriteIcon : addToFavoriteIcon}
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
            src={weatherIconSrc}
            alt="weather-icon"
            className={`lc_weather-icon ${
              shouldIcnBeInverted(weatherData?.weatherIcon ?? "")
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
