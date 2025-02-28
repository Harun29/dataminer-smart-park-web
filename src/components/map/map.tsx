"use client";

import ReadingType from "@/types/ReadingType";
import {
  APIProvider,
  Map
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import MarkerWithPopover from "./marker-with-popover";
import { Polygon } from "./polygon";
import zones from "./zones";
import { useSensors } from "@/app/context/sensorsContext";
import { useAlarms } from "@/app/context/alarmsContexts";

const getZoneColor = (zoneName: string) => {
  switch (zoneName) {
    case "Igraliste":
      return "#FF0000";
    case "Pond":
      return "#0000FF";
    case "Rest":
      return "#FFFF00"; 
    case "Park Maintenance":
      return "#FF00FF";
    case "Parking":
      return "#00FFFF";
    case "Recreation":
      return "#FFA500";
    default:
      return "#7DA5F5";
  }
};

const MapView = () => {
  const [zoom, setZoom] = useState(18);
  const [center, setCenter] = useState({
    lat: 43.84826298213925,
    lng: 18.335363239634667,
  });
  const { readings } = useSensors();
  const {activeSensor} = useAlarms();

  const handleCenterChanged = useCallback((e: any) => {
    setCenter(e.center);
  }, []);

  const handleZoomChange = useCallback((e: any) => {
    setZoom(e.zoom);
  }, []);

  return (
    readings.length > 0 ? (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Map
          mapId={process.env.NEXT_PUBLIC_MAP_ID || ""}
          zoom={zoom}
          center={center}
          onCenterChanged={(e) => handleCenterChanged(e)}
          onZoomChanged={(e) => handleZoomChange(e)}
          clickableIcons={false}
          fullscreenControl={false}
        >
          {readings.map((reading) => (
            <MarkerWithPopover key={reading.id} reading={reading} />
          ))}
          {zones.map((zone) => (
            <Polygon
              key={zone.id}
              fillColor={getZoneColor(zone.name)}
              fillOpacity={0.2}
              strokeColor={"#7DA5F5"}
              strokeWeight={1}
              paths={zone.points.map((point) => ({ lat: point.lat, lng: point.lng }))}
            />
          ))}
        </Map>
      </APIProvider>
    ) : (
      <p>Loading sensor data...</p>
    )
  );
  
};

export default MapView;
