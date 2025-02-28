import { useEffect, useRef, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ReadingType from "@/types/ReadingType";
import { getPinIcon, getPinPosition } from "@/app/utils/pinUtils";
import { useAlarms } from "@/app/context/alarmsContexts";

type MarkerWithPopoverProps = {
  reading: ReadingType;
};

const MarkerWithPopover = ({ reading }: MarkerWithPopoverProps) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { alarms, activeSensor, setActiveSensor } = useAlarms();
  const [severity, setSeverity] = useState<number>(0);

  useEffect(() => {
    const alarm = alarms.find(alarm => alarm.senzorId === parseInt(reading.id));
    if (alarm) {
      setSeverity(alarm.level);
    }
  }, [alarms, reading.id]);

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

  return ( reading.coordinates && 
    <AdvancedMarker
      onClick={() => setOpen(!open)}
      key={getPinPosition(reading).id}
      position={{
        lat: getPinPosition(reading).lat,
        lng: getPinPosition(reading).lng,
      }}
    >
      <Popover open={open}>
        <PopoverTrigger onClick={() => setActiveSensor(0)} className={`flex items-center justify-center ${reading.name.includes("People") ? "w-16" : "w-7"} h-7 ${severity === 0 || severity === 1 ? "bg-blue-400" : severity === 2 ? "bg-yellow-400" : "bg-red-400"} text-white rounded-full shadow-lg hover:scale-125 transform transition-transform hover:z-50 ${activeSensor === parseInt(reading.id) ? "animate-bounce !w-9 !h-9" : ""}`}>
          {getPinIcon(reading.name)?.icon}
          {reading.name.includes("People") && (
            <span className="ml-2 text-lg">{reading.value}</span>
          )}
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
                  {reading.unit === "Binary" ? 
                    (reading.value === 1 ? "ON" : "OFF") : reading.value + " " + reading.unit
                  }
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Sensor Type:</span>
                <span className="text-end">{reading.sensorType}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Sensor Status:</span>
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