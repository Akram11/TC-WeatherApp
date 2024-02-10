import React from "react";
import "./LocationContainer.css";
import { WeatherData } from "../../pages/home-page/HomePage";

interface LocationContainerProps {
  imgUrl: string;
  locationName: string;
  weatherData: WeatherData;
}
const LocationContainer: React.FC<LocationContainerProps> = ({
  imgUrl,
  locationName,
  weatherData,
}: LocationContainerProps) => {
  return (
    <div className="location-container">
      <img src={imgUrl} alt="" className="location-img" />
      <div className="weather-info">
        <div className="location-name">{locationName}</div>
        {/* <div className="temperature">{Math.round(weatherData.temperature)}</div> */}
        <div className="feels-like">Feels Like: 22°C</div>
        <div className="weather-description">Clear Sky</div>
      </div>
    </div>
  );
};

export default LocationContainer;
