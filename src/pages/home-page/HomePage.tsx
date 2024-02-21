import React, { useEffect, Suspense, useState, useRef } from "react";
import "./HomePage.css";
import { Location } from "../../interfaces/Location";
import { WeatherData } from "../../interfaces/WeatherData";
import { fetchWeatherData } from "../../services/api";
import ReactLoading from "react-loading";
import { useJsApiLoader } from "@react-google-maps/api";
import { defaultLocatoinAttributes, googleJSLoaderLibs } from "../../constants";

const SearchBar = React.lazy(
  () => import("../../components/search-bar/SearchBar")
);
const FavoriteLocations = React.lazy(
  () => import("../../components/favorite-locations/FavoriteLocations")
);
const LocationContainer = React.lazy(
  () => import("../../components/location-container/LocationContainer")
);

const HomePage: React.FC = () => {
  const [locationAttributes, setLocationAttributes] = useState<Location>();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([
    defaultLocatoinAttributes,
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("Berlin, Germany");
  const [visibleInputText, setVisibleInputText] = useState<string>(searchQuery);
  const [hasError, setHasError] = useState(false);
  const childInputRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: googleJSLoaderLibs,
  });
  const isLocationFavorite = (): boolean => {
    return favoriteLocations?.some(
      (favoriteLocation) =>
        favoriteLocation.placeId === locationAttributes?.placeId
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
    fetchWeatherData(
      locationAttributes?.lat || 0,
      locationAttributes?.lng || 0
    ).then((data: any) => {
      if (data) {
        setWeatherData(data);
        setHasError(false);
      } else {
        setHasError(true);
      }
    });
  }, [locationAttributes]);

  if (loadError || hasError)
    return (
      <div className="container-404">
        The App has encountered an error, please try again later.
      </div>
    );
  return (
    <div className="container">
      <Suspense
        fallback={
          <div className="loading-cnt">
            <ReactLoading
              type={"spin"}
              color={"#fff"}
              height={100}
              width={100}
            />
          </div>
        }
      >
        <SearchBar
          childInputRef={childInputRef}
          setLocationAttributes={setLocationAttributes}
          isLoaded={isLoaded}
          visibleInputText={visibleInputText}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setVisibleInputText={setVisibleInputText}
        />
        <FavoriteLocations
          locations={favoriteLocations}
          setSearchQuery={setSearchQuery}
        />
        {locationAttributes && weatherData && (
          <LocationContainer
            isFavorite={isLocationFavorite()}
            toggleLocationToFav={handleToggleAddToFav}
            location={locationAttributes}
            weatherData={weatherData}
          />
        )}
      </Suspense>
    </div>
  );
};

export default HomePage;
