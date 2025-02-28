import ReadingType from "@/types/ReadingType";
import {
  BatteryCharging,
  Droplet,
  Grid,
  Lamp,
  ParkingCircle,
  Thermometer,
  Trash,
  Triangle,
  Users
} from "lucide-react";

export const getPinIcon = (sensorName: string) => {
  if (sensorName.includes("Temperature")) {
    return { icon: <Thermometer size={16} /> };
  }else if (sensorName.includes("Trash")) {
    return { icon: <Trash size={16} /> };
  }else if (sensorName.includes("Soil")) {
    return { icon: <Droplet size={16} /> };
  }else if (sensorName.includes("Fountain")) {
    return { icon: <Triangle size={16} /> };
  }else if (sensorName.includes("Light")) {
    return { icon: <Lamp size={16} /> };
  }else if (sensorName.includes("Parking")) {
    return { icon: <ParkingCircle size={16} /> };
  }else if (sensorName.includes("Battery")) {
    return { icon: <BatteryCharging size={16} /> };
  }else if (sensorName.includes("Solar")) {
    return { icon: <Grid size={16} /> };
  }else if (sensorName.includes("People")) {
    return { icon: <Users size={16}/> };
  }
};

export const getPinPosition = (reading: ReadingType) => {
  const [lat, lng] = reading.coordinates.split(", ").map(Number);
  if(lat === 0 || lng === 0) {
    return { id: reading.id, lat: 43.84820, lng: 18.33536, sensorType: reading.sensorType };
  }
  return { id: reading.id, lat, lng, sensorType: reading.sensorType };
};