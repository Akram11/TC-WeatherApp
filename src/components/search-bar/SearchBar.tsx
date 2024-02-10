import React, { useRef} from "react";
import {
  Libraries,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./SearchBar.css";
import { LocationAttributes } from "../../pages/home-page/HomePage";

interface SearchBarProps {
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  setLocationAttributes: React.Dispatch<
    React.SetStateAction<LocationAttributes>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setImgUrl,
  setLocationAttributes,
}: SearchBarProps) => {
  const inputRef = useRef<any>();
  const libraries: Libraries = ["places"];

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAagZlKPleDMi0DOg2LYE-FLixJNSgEAJo",
    libraries,
  });

  const handlePlaceChanged = () => {
    const [place] = inputRef?.current?.getPlaces();
    if (place) {
      place.photos && setImgUrl(place?.photos[0]?.getUrl());
      setLocationAttributes({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        formatted_address: place.formatted_address,
      });
  };

  return (
    <>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            className="search-bar"
            placeholder="search for a location ... "
          />
        </StandaloneSearchBox>
      )}
    </>
  );
};

export default SearchBar;
