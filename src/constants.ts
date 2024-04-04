import { Libraries } from "@react-google-maps/api";
import { Location } from "./interfaces/Location";

export const defaultLat: number = 52.52000659999999;
export const defaultLng: number = 13.404954;
export const defaultFormattedAddress: string = "Berlin, Germany";
export const defaultLocatoinId: string = "ChIJAVkDPzdOqEcRcDteW0YgIQQ";

export const defaultLocationAttributes: Location = {
  placeId: defaultLocatoinId,
  lat: defaultLat,
  lng: defaultLng,
  formatted_address: defaultFormattedAddress,
  imgUrl: "",
};

export const googleJSLoaderLibs: Libraries = ["places"];
