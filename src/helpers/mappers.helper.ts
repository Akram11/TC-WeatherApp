import { Location } from "../interfaces/Location";

export const mapPlaceToLocation = (place: any): Location => {
  const imgUrl = place.photos?.[0]?.getUrl() || "";
  const { lat, lng } = place.geometry.location;
  const placeId = place.place_id;
  const formatted_address = place.formatted_address;

  return {
    placeId,
    lat: lat(),
    lng: lng(),
    formatted_address,
    imgUrl,
  };
};
