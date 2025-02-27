"use client";

import ReadingType from "@/types/ReadingType";
import {
  APIProvider,
  Map
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import MarkerWithPopover from "./marker-with-popover";
import { Polygon } from "./polygon";
import zones from "./zones";

const MapView = () => {
  const [zoom, setZoom] = useState(18);
  const [center, setCenter] = useState({
    lat: 43.84826298213925,
    lng: 18.335363239634667,
  });

  const dummyData: ReadingType[] = [
    { id: 1, name: "Sensor 1", lowerBound: 0, upperBound: 100, value: 50, unit: "C", zone: "Zone 1", sensorType: "Temperature", coordinates: "43.84826298213925,18.335363239634667", isActive: true },
    { id: 2, name: "Sensor 2", lowerBound: 0, upperBound: 100, value: 75, unit: "C", zone: "Zone 2", sensorType: "Temperature", coordinates: "43.84789179404418,18.334492415502588", isActive: true },
    { id: 3, name: "Trash Can 1", lowerBound: 0, upperBound: 100, value: 30, unit: "%", zone: "Zone 3", sensorType: "Trash Can", coordinates: "43.848500,18.335200", isActive: true },
    { id: 4, name: "Weather Station 1", lowerBound: 0, upperBound: 100, value: 20, unit: "C", zone: "Zone 4", sensorType: "Weather", coordinates: "43.848700,18.334700", isActive: true },
    { id: 5, name: "Soil Sensor 1", lowerBound: 0, upperBound: 100, value: 40, unit: "%", zone: "Zone 5", sensorType: "Soil", coordinates: "43.848900,18.334200", isActive: true },
    { id: 8, name: "Sensor 3", lowerBound: 0, upperBound: 100, value: 45, unit: "C", zone: "Zone 1", sensorType: "Temperature", coordinates: "43.849000,18.336000", isActive: true },
    { id: 9, name: "Trash Can 2", lowerBound: 0, upperBound: 100, value: 50, unit: "%", zone: "Zone 3", sensorType: "Trash Can", coordinates: "43.848600,18.335500", isActive: true },
    { id: 10, name: "Weather Station 2", lowerBound: -20, upperBound: 50, value: 18, unit: "C", zone: "Zone 4", sensorType: "Weather", coordinates: "43.849200,18.335800", isActive: true },
    { id: 11, name: "Soil Sensor 2", lowerBound: 0, upperBound: 100, value: 35, unit: "%", zone: "Zone 5", sensorType: "Soil", coordinates: "43.849100,18.334900", isActive: true },
    { id: 12, name: "Fountain Sensor 2", lowerBound: 0, upperBound: 100, value: 55, unit: "L", zone: "Zone 6", sensorType: "Fountain", coordinates: "43.847500,18.336000", isActive: true },
    { id: 13, name: "Lamp Sensor 2", lowerBound: 0, upperBound: 100, value: 75, unit: "Lux", zone: "Zone 7", sensorType: "Lamp", coordinates: "43.848700,18.336500", isActive: true },
    { id: 14, name: "Sensor 4", lowerBound: 0, upperBound: 100, value: 65, unit: "C", zone: "Zone 1", sensorType: "Temperature", coordinates: "43.847800,18.334900", isActive: true },
    { id: 17, name: "Soil Sensor 3", lowerBound: 0, upperBound: 100, value: 47, unit: "%", zone: "Zone 5", sensorType: "Soil", coordinates: "43.847600,18.335400", isActive: true },
    { id: 19, name: "Lamp Sensor 3", lowerBound: 0, upperBound: 100, value: 90, unit: "Lux", zone: "Zone 7", sensorType: "Lamp", coordinates: "43.847300,18.336100", isActive: true },
    { id: 20, name: "Sensor 5", lowerBound: 0, upperBound: 100, value: 72, unit: "C", zone: "Zone 1", sensorType: "Temperature", coordinates: "43.848800,18.335100", isActive: true },
];

  const handleCenterChanged = useCallback((e: any) => {
    setCenter(e.center);
  }, []);

  const handleZoomChange = useCallback((e: any) => {
    setZoom(e.zoom);
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        mapId={process.env.NEXT_PUBLIC_MAP_ID || ""}
        zoom={zoom}
        center={center}
        onCenterChanged={(e) => handleCenterChanged(e)}
        onZoomChanged={(e) => handleZoomChange(e)}
        clickableIcons={false}
        mapTypeControl={false}
        fullscreenControl={false}
      >
        {dummyData.map((reading) => (
          <MarkerWithPopover key={reading.id} reading={reading} />
        ))}
        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            fillColor="#7DA5F5"
            fillOpacity={0.2}
            strokeColor={"#7DA5F5"}
            strokeWeight={1}
            paths={zone.points.map((point) => ({ lat: point.lat, lng: point.lng }))}
          />
        ))}
      </Map>
    </APIProvider>
  );
};

export default MapView;
