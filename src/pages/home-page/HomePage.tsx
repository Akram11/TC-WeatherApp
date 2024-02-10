import React, { useEffect } from "react";
import "./HomePage.css";
import SearchBar from "../../components/search-bar/SearchBar";
import LocationContainer from "../../components/location-container/LocationContainer";

export interface LocationAttributes {
  lat: number | null;
  lng: number | null;
  formatted_address: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
}

const HomePage: React.FC = () => {
  const [imgUrl, setImgUrl] = React.useState("");
  const [locationAttributes, setLocationAttributes] =
    React.useState<LocationAttributes>({
      lat: 0,
      lng: 0,
      formatted_address: "",
    });
  const [weatherData, setWeatherData] = React.useState<any>(null);

  useEffect(() => {
    const lat = locationAttributes.lat;
    const lng = locationAttributes.lng;
    if (lat && lng) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=282a05a3c8db9d58f5af2a852898e86e`
      )
        .then((response) => response.json())
        .then((data) =>
          setWeatherData({
            temperature: data?.main.temp,
            feelsLike: data?.main.feels_like,
            description: data?.weather[0].description,
          })
        )
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
