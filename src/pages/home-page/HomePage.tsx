import React, { Suspense, useState, useRef, useCallback, useMemo } from "react";
import ReactLoading from "react-loading";
import { useJsApiLoader } from "@react-google-maps/api";

import "./HomePage.css";
import { Location } from "../../interfaces/Location";
import { defaultLocationAttributes, googleJSLoaderLibs } from "../../constants";

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
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([
    defaultLocationAttributes,
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("Berlin, Germany");
  const [visibleInputText, setVisibleInputText] = useState<string>(searchQuery);
  const childInputRef = useRef(null);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries: googleJSLoaderLibs,
  });

  const isLocationFavorite = useCallback((): boolean => {
    return favoriteLocations?.some(
      (favoriteLocation) =>
        favoriteLocation.placeId === locationAttributes?.placeId
    );
  }, [favoriteLocations, locationAttributes?.placeId]);

  const handleToggleAddToFav = useCallback((location: Location) => {
    setFavoriteLocations((prev) =>
      prev.some((favLocation) => favLocation.placeId === location.placeId)
        ? prev.filter((favLocation) => favLocation.placeId !== location.placeId)
        : [...prev, location]
    );
  }, []);

  const locationContainer = useMemo(() => {
    return (
      locationAttributes && (
        <LocationContainer
          isFavorite={isLocationFavorite()}
          toggleLocationToFav={handleToggleAddToFav}
          location={locationAttributes}
        />
      )
    );
  }, [locationAttributes, isLocationFavorite, handleToggleAddToFav]);

  if (!googleMapsApiKey || loadError) {
    return (
      <div className="container-404">
        The App has encountered an error: {loadError ? loadError.message : 'Google Maps API key is not set'}. Please try again later.
      </div>
    );
  }
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
        {locationContainer}
      </Suspense>
    </div>
  );
};

export default HomePage;
