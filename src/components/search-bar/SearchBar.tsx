import React, { useEffect } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import "./SearchBar.css";
import { Location } from "../../interfaces/Location";
import useFindPlaceFromQuery from "../../hooks/use-find-place-from-query";

interface SearchBarProps {
  setLocationAttributes: (location: Location) => void;
  isLoaded: boolean;
  visibleInputText: string;
  searchQuery: string;
  setVisibleInputText: (arg0: string) => void;
  setSearchQuery: (arg0: string) => void;
  childInputRef: React.MutableRefObject<any>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setLocationAttributes,
  isLoaded,
  searchQuery,
  visibleInputText,
  setSearchQuery,
  setVisibleInputText,
  childInputRef,
}: SearchBarProps) => {
  const { place } = useFindPlaceFromQuery(childInputRef, isLoaded, searchQuery);

  useEffect(() => {
    if (place) {
      setLocationAttributes(place);
      setVisibleInputText(place.formatted_address);
    }
  }, [isLoaded, place, setLocationAttributes, setVisibleInputText]);

  return (
    <>
      {isLoaded ? (
        <StandaloneSearchBox
          onPlacesChanged={() =>
            setSearchQuery(childInputRef.current?.value || "")
          }
        >
          <input
            type="text"
            className="search-bar"
            placeholder={visibleInputText}
            ref={childInputRef}
            autoFocus={true}
            value={visibleInputText}
            onChange={(e) => setVisibleInputText(e.target.value)}
          />
        </StandaloneSearchBox>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default SearchBar;
