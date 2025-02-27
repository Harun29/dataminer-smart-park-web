"use client";

import { useAlarms } from "@/app/context/alarmsContexts";
import AlarmInfo from "./alarm-info";
import { Button } from "./ui/button";

const WorkersTasks = () => {
  const { myAlarms } = useAlarms();

  return (
    <div>
      {myAlarms[0] ? (
        myAlarms.map((alarm) => (
          <div className="task-item rounded-lg overflow-hidden m-3 cursor-pointer hover:scale-105 transform transition-transform">
            <AlarmInfo
              name={alarm.sensorType}
              value={alarm.capacity}
              severity={alarm.level}
            />
            <Button
              variant="outline"
              className="mark-as-done-button rounded-none w-full bg-blue-400 text-white"
            >
              Mark As Done!
            </Button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          Assigned tasks will appear here
        </div>
      )}
    </div>
  );
};

export default WorkersTasks;
