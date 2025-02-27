import { useEffect, useRef, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ReadingType from "@/types/ReadingType";
import { getPinIcon, getPinPosition } from "@/app/utils/utils";

type MarkerWithPopoverProps = {
  reading: ReadingType;
};

const MarkerWithPopover = ({ reading }: MarkerWithPopoverProps) => {
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
};

export default MarkerWithPopover;