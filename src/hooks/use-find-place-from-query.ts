import { useCallback, useEffect, useMemo, useState } from "react";
import { mapPlaceToLocation } from "../helpers/mappers.helper";
import { Location } from "../interfaces/Location";

function useFindPlaceFromQuery(
  searchInputRef: { current: HTMLDivElement | google.maps.Map },
  isLoaded: boolean,
  searchQuery: string
) {
  const [place, setPlace] = useState<Location>();
  const request = useMemo(
    () => ({
      query: searchQuery,
      fields: ["name", "geometry", "place_id", "formatted_address", "photos"],
    }),
    [searchQuery]
  );

  const findPlaceFromQuery = useCallback(() => {
    const service =
      searchInputRef?.current &&
      new google.maps.places.PlacesService(searchInputRef.current);

    service?.findPlaceFromQuery(request, (results: any, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const formattedPlace = mapPlaceToLocation(results[0]);
        setPlace(formattedPlace);
      }
    });
  }, [request, searchInputRef]);

  useEffect(() => {
    findPlaceFromQuery();
  }, [findPlaceFromQuery, isLoaded, searchQuery]);

  return { findPlaceFromQuery, place };
}

export default useFindPlaceFromQuery;
