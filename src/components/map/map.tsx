"use client";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import ReadingType from "@/types/ReadingType";
import {
  CloudSunRain,
  Droplet,
  Lamp,
  Thermometer,
  Trash,
  Triangle,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const MapView = () => {
  const [zoom, setZoom] = useState(18);
  const [center, setCenter] = useState({
    lat: 43.84826298213925,
    lng: 18.335363239634667,
  });

  const dummyData: ReadingType[] = [
    {
      id: 1,
      name: "Sensor 1",
      lowerBound: 0,
      upperBound: 100,
      value: 50,
      unit: "C",
      zone: "Zone 1",
      sensorType: "Temperature",
      coordinates: "43.84826298213925,18.335363239634667",
      isActive: true,
    },
    {
      id: 2,
      name: "Sensor 2",
      lowerBound: 0,
      upperBound: 100,
      value: 75,
      unit: "C",
      zone: "Zone 2",
      sensorType: "Temperature",
      coordinates: "43.84789179404418,18.334492415502588",
      isActive: true,
    },
    {
      id: 3,
      name: "Trash Can 1",
      lowerBound: 0,
      upperBound: 100,
      value: 30,
      unit: "%",
      zone: "Zone 3",
      sensorType: "Trash Can",
      coordinates: "43.848500,18.335200",
      isActive: true,
    },
    {
      id: 4,
      name: "Weather Station 1",
      lowerBound: 0,
      upperBound: 100,
      value: 20,
      unit: "C",
      zone: "Zone 4",
      sensorType: "Weather",
      coordinates: "43.848700,18.334700",
      isActive: true,
    },
    {
      id: 5,
      name: "Soil Sensor 1",
      lowerBound: 0,
      upperBound: 100,
      value: 40,
      unit: "%",
      zone: "Zone 5",
      sensorType: "Soil",
      coordinates: "43.848900,18.334200",
      isActive: true,
    },
    {
      id: 6,
      name: "Fountain Sensor 1",
      lowerBound: 0,
      upperBound: 100,
      value: 60,
      unit: "L",
      zone: "Zone 6",
      sensorType: "Fountain",
      coordinates: "43.847100,18.335100",
      isActive: true,
    },
    {
      id: 7,
      name: "Lamp Sensor 1",
      lowerBound: 0,
      upperBound: 100,
      value: 80,
      unit: "Lux",
      zone: "Zone 7",
      sensorType: "Lamp",
      coordinates: "43.849300,18.335300",
      isActive: true,
    },
  ];

  const handleCenterChanged = useCallback((e: any) => {
    setCenter(e.center);
  }, []);

  const handleZoomChange = useCallback((e: any) => {
    setZoom(e.zoom);
  }, []);

  const getPinIcon = (sensorType: string) => {
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

  const getPinPosition = (reading: ReadingType) => {
    const [lat, lng] = reading.coordinates.split(",").map(Number);
    return { id: reading.id, lat, lng, sensorType: reading.sensorType };
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        mapId={process.env.NEXT_PUBLIC_MAP_ID || ""}
        zoom={zoom}
        center={center}
        onCenterChanged={(e) => handleCenterChanged(e)}
        onZoomChanged={(e) => handleZoomChange(e)}
        clickableIcons={false}
      >
        {dummyData.map((reading) => {
          const [open, setOpen] = useState(false);
          const popoverRef = useRef<HTMLDivElement>(null);

          useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
              if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
              ) {
                setOpen(false);
              }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, []);

          return (
            <AdvancedMarker
              onClick={() => setOpen(!open)}
              key={getPinPosition(reading).id}
              position={{
                lat: getPinPosition(reading).lat,
                lng: getPinPosition(reading).lng,
              }}
            >
              <Popover open={open}>
                <PopoverTrigger className="flex items-center justify-center w-7 h-7 bg-blue-400 text-white rounded-full shadow-lg hover:scale-125 transform transition-transform">
                  {getPinIcon(reading.sensorType).icon}
                </PopoverTrigger>
                <PopoverContent className="p-0" ref={popoverRef}>
                  <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      {reading.name}
                    </h3>
                    <div className="space-y-4 text-gray-700">
                      <p className="flex justify-between">
                        <span className="font-medium">Value:</span>
                        <span>
                          {reading.value} {reading.unit}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Zone:</span>
                        <span>{reading.zone}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Sensor Type:</span>
                        <span>{reading.sensorType}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span
                          className={`text-${
                            reading.isActive ? "green" : "red"
                          }-500`}
                        >
                          {reading.isActive ? "Active" : "Inactive"}
                        </span>
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </AdvancedMarker>
          );
        })}
      </Map>
    </APIProvider>
  );
};

export default MapView;
