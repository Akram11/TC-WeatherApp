import React from "react";
import { Location } from "../../interfaces/Location";
import "./FavoriteLocations.css";
import FavoriteLocationCard from "../favorite-location-card/FavoriteLocationCard";

interface FavoriteLocationsProps {
  locations: Location[];
}
const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
  locations,
}: FavoriteLocationsProps) => {
  return (
    <div className="fav-container">
      {locations.map((location) => (
        <FavoriteLocationCard location={location} key={location.placeId} />
      ))}
    </div>
  );
};

export default FavoriteLocations;
