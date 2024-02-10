import React, { useRef } from "react";
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
    React.SetStateAction<LocationAttributes>
  >;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setImgUrl,
  setLocationAttributes,
}: SearchBarProps) => {
  const inputRef = useRef<any>();
  const libraries: Libraries = ["places"];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAagZlKPleDMi0DOg2LYE-FLixJNSgEAJo",
    libraries,
  });

  const handlePlaceChanged = async () => {
    let places = inputRef?.current?.getPlaces();
    if (places && Array.isArray(places)) {
      const [place] = places;

      if (place) {
        place.photos && setImgUrl(place?.photos[0]?.getUrl());
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocationAttributes({
          lat,
          lng,
          formatted_address: place.formatted_address,
        });
      }
    }
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
