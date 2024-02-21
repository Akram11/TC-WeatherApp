import React from "react";
import { Location } from "../../interfaces/Location";
import "./FavoriteLocations.css";
import FavoriteLocationCard from "../favorite-location-card/FavoriteLocationCard";

interface FavoriteLocationsProps {
  locations: Location[];
  setSearchQuery: (arg0: string) => void;
}
const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
  locations,
  setSearchQuery,
}: FavoriteLocationsProps) => {
  return (
    <div className="fav-container">
      {locations.map((location) => (
        <FavoriteLocationCard
          location={location}
          key={location.placeId}
          setSearchQuery={setSearchQuery}
        />
      ))}
    </div>
  );
};

export default FavoriteLocations;
