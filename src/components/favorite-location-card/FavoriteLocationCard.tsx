import React, { useEffect } from "react";
import { Location } from "../../interfaces/Location";
import "./FavoriteLocationCard.css";
import { fetchWeatherData } from "../../services/api";
import { WeatherData } from "../../interfaces/WeatherData";
import { shouldIcnBeInverted } from "../../helpers/functions.helper";
import ReactLoading from "react-loading";

interface FavoriteLocationCardProps {
  location: Location;
  setSearchQuery: (arg0: string) => void;
}

const FavoriteLocationCard: React.FC<FavoriteLocationCardProps> = ({
  location,
  setSearchQuery,
}: FavoriteLocationCardProps) => {
  const [weatherData, setWeatherData] = React.useState<WeatherData | undefined>(
    undefined
  );

  useEffect(() => {
    fetchWeatherData(location.lat, location.lng)
      .then((data) => setWeatherData(data || undefined))
      .catch((error) => console.error("Error:", error));
  }, [location.lat, location.lng]);

  if (!weatherData)
    return (
      <div className="loading-cnt">
        <ReactLoading type={"spin"} color={"#fff"} height={100} width={100} />
      </div>
    );
  return (
    <div
      className="location-card"
      onClick={() => setSearchQuery(location.formatted_address)}
    >
      <div className="location-card-name">{location.formatted_address}</div>
      <div className="location-card-weather">
        <div>
          {weatherData?.temperature && Math.round(weatherData?.temperature)}°
        </div>
        <img
          width={28}
          src={
            weatherData?.weatherIcon
              ? ` https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`
              : `/icons/unknown.png`
          }
          alt="weather-icon"
          className={`location-card-weather-icon ${
            shouldIcnBeInverted(weatherData?.weatherIcon ?? "")
              ? "location-card-weather-icon__inverted"
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default FavoriteLocationCard;
