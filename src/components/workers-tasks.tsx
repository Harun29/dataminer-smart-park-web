"use client";

import { useAlarms } from "@/app/context/alarmsContexts";
import AlarmInfo from "./alarm-info";
import { Button } from "./ui/button";

const WorkersTasks = () => {
  const { myAlarms, setMyAlarms } = useAlarms();

  const markAsDone = async (alarmId: number) => {
    try {
      const response = await fetch(`https://localhost:7206/api/Alarm/DeleteAlarm/${alarmId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setMyAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== alarmId));
      console.log(`Alarm ${alarmId} marked as done`);
    } catch (error) {
      console.error("Failed to mark alarm as done:", error);
    }
  };

  return (
    <div>
      {myAlarms[0] ? (
        myAlarms.map((alarm, index) => (
          <div key={index} className="task-item rounded-lg overflow-hidden m-3 cursor-pointer hover:scale-105 transform transition-transform">
            <AlarmInfo
              name={alarm.senyorType}
              value={alarm.capacity}
              severity={alarm.level}
            />
            <Button
              variant="outline"
              className="mark-as-done-button rounded-none w-full bg-blue-400 text-white"
              onClick={() => markAsDone(alarm.id)}
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
