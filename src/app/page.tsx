"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import AlarmsDrawer from "@/components/alarms-drawer";
import BasicInfo from "@/components/basic-info";
import SensorInfo from "@/components/sensor-info";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function Home() {
  const [zoom, setZoom] = useState(18);
  const [center, setCenter] = useState({ lat: 43.84826298213925, lng: 18.335363239634667 });

  const handleCnterChanged = useCallback((e: any) => {
    setCenter(e.center);
  }, []);

  const handleZoomChange = useCallback((e: any) => {
    setZoom(e.zoom);
  }, []);

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="h-[calc(100vh)] w-[calc(100vw)]">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Map
            zoom={zoom}
            center={center}
            onCenterChanged={(e) => handleCnterChanged(e)}
            onZoomChanged={(e) => handleZoomChange(e)}
          />
        </APIProvider>
      </div>

      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-4">
        <BasicInfo />
        <SensorInfo type="Trash" />
        <SensorInfo type="Light" />
        <SensorInfo type="Bench" />
        <SensorInfo type="Fountain" />
      </div>
    </div>
  );
}
