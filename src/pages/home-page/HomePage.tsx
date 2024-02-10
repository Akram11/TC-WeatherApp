import React, { useEffect } from "react";
import "./HomePage.css";
import SearchBar from "../../components/search-bar/SearchBar";
import { LocationContainer } from "../../components/location-container/LocationContainer";
import {
  defaultImgUrl,
  defaultLat,
  defaultLng,
  defaultFormattedAddress,
} from "../../constants";

export interface LocationAttributes {
  lat: number | null;
  lng: number | null;
  formatted_address: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  weatherIcon: string;
}

const HomePage: React.FC = () => {
  const [imgUrl, setImgUrl] = React.useState(defaultImgUrl);
  const [locationAttributes, setLocationAttributes] =
    React.useState<LocationAttributes>({
      lat: defaultLat,
      lng: defaultLng,
      formatted_address: defaultFormattedAddress,
    });
  const [weatherData, setWeatherData] = React.useState<WeatherData>({
    temperature: 0,
    feelsLike: 0,
    description: "",
    weatherIcon: "",
  });

  useEffect(() => {
    const lat = locationAttributes.lat;
    const lng = locationAttributes.lng;
    if (lat && lng) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=282a05a3c8db9d58f5af2a852898e86e&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.cod === 200 &&
            setWeatherData({
              temperature: data?.main.temp,
              feelsLike: data?.main.feels_like,
              description: data?.weather[0].description,
              weatherIcon: data?.weather[0].icon,
            });
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [locationAttributes]);

  return (
    <div className="container">
      <SearchBar
        setImgUrl={setImgUrl}
        setLocationAttributes={setLocationAttributes}
      />
      <LocationContainer
        imgUrl={imgUrl}
        locationName={locationAttributes.formatted_address}
        weatherData={weatherData}
      />
    </div>
  );
};

export default HomePage;
