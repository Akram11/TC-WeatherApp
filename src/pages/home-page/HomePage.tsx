import React, { useEffect } from "react";
import "./HomePage.css";
import SearchBar from "../../components/search-bar/SearchBar";
import { LocationContainer } from "../../components/location-container/LocationContainer";
import { defaultLocatoinAttributes, defaultWeatherData } from "../../constants";
import { Location } from "../../interfaces/Location";
import { WeatherData } from "../../interfaces/WeatherData";
import FavoriteLocations from "../../components/favorite-locations/FavoriteLocations";
import { fetchWeatherData } from "../../services/api";

const HomePage: React.FC = () => {
  const [locationAttributes, setLocationAttributes] = React.useState<Location>(
    defaultLocatoinAttributes
  );

  const [weatherData, setWeatherData] =
    React.useState<WeatherData>(defaultWeatherData);
  const [favoriteLocations, setFavoriteLocations] = React.useState<Location[]>([
    defaultLocatoinAttributes,
  ]);

  const isLocationFavorite = (): boolean => {
    return favoriteLocations.some(
      (favoriteLocation) =>
        favoriteLocation.placeId === locationAttributes.placeId
    );
  };

  const handleToggleAddToFav = (location: Location) => {
    setFavoriteLocations((prev) =>
      prev.some((favLocation) => favLocation.placeId === location.placeId)
        ? prev.filter((favLocation) => favLocation.placeId !== location.placeId)
        : [...prev, location]
    );
  };

  useEffect(() => {
    fetchWeatherData(locationAttributes.lat, locationAttributes.lng)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error:", error));
  }, [locationAttributes]);

  return (
    <div className="container">
      <SearchBar setLocationAttributes={setLocationAttributes} />
      <FavoriteLocations locations={favoriteLocations} />
      <LocationContainer
        isFavorite={isLocationFavorite()}
        toggleLocationToFav={handleToggleAddToFav}
        location={locationAttributes}
        weatherData={weatherData}
      />
    </div>
  );
};

export default HomePage;
