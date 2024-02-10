import React, { useRef } from "react";
import {
  Libraries,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./SearchBar.css";
import { Location } from "../../interfaces/Location";

interface SearchBarProps {
  setLocationAttributes: React.Dispatch<React.SetStateAction<Location>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setLocationAttributes,
}: SearchBarProps) => {
  const inputRef = useRef<any>();
  const libraries: Libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const handlePlaceChanged = async () => {
    let places = inputRef?.current?.getPlaces();
    if (places && Array.isArray(places)) {
      const [place] = places;
      if (place) {
        const imgUrl = place.photos && place?.photos[0]?.getUrl();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const placeId = place.place_id;
        const formatted_address = place.formatted_address;
        setLocationAttributes({
          placeId,
          lat,
          lng,
          formatted_address,
          imgUrl,
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
