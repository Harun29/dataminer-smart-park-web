"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Bell, BellRing } from "lucide-react";

interface Alarm {
  id: number;
  device: string;
  message: string;
}

const AlarmsDrawer = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: 1, device: "Trash Can", message: "65% full" },
    { id: 2, device: "Light2", message: "Failed" },
    { id: 3, device: "Bench1", message: "Occupied 2/3" },
    { id: 4, device: "Bench1", message: "Occupied 2/3" },
  ]);

  const assignToWorker = (alarmId: number) => {
    console.log(`Assigning alarm ${alarmId} to user`);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild className="fixed bottom-4 right-4">
        <Button variant="outline" className="rounded-full h-16 w-16 text-xl p-0">
          <BellRing className="!w-6 !h-6" strokeWidth={1}/>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Device Alarms</DrawerTitle>
          <DrawerDescription>Click on an alarm to assign it to a user.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {alarms.map((alarm) => (
            <div key={alarm.id} className="bg-gray-100 p-4 mb-3 rounded-lg flex justify-between items-center">
              <div>
                <strong>{alarm.device}</strong>: {alarm.message}
              </div>
              <Button variant="ghost" onClick={() => assignToWorker(alarm.id)}>Assign</Button>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AlarmsDrawer;