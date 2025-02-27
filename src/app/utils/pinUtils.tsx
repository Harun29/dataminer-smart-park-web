import {
  CloudSunRain,
  Droplet,
  Lamp,
  Thermometer,
  Trash,
  Triangle,
} from "lucide-react";
import ReadingType from "@/types/ReadingType";

export const getPinIcon = (sensorType: string) => {
  switch (sensorType) {
    case "Temperature":
      return { icon: <Thermometer size={16} /> };
    case "Trash Can":
      return { icon: <Trash size={16} /> };
    case "Weather":
      return { icon: <CloudSunRain size={16} /> };
    case "Soil":
      return { icon: <Droplet size={16} /> };
    case "Fountain":
      return { icon: <Triangle size={16} /> };
    case "Lamp":
      return { icon: <Lamp size={16} /> };
    default:
      return { icon: null };
  }
};

export const getPinPosition = (reading: ReadingType) => {
  const [lat, lng] = reading.coordinates.split(", ").map(Number);
  if(lat === 0 || lng === 0) {
    return { id: reading.id, lat: 43.84820, lng: 18.33536, sensorType: reading.sensorType };
  }
  return { id: reading.id, lat, lng, sensorType: reading.sensorType };
};