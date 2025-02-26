"use client";

import { BellRing } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
        <Button
          variant="outline"
          className="rounded-full h-16 w-16 text-xl p-0 bg-blue-400 text-white"
        >
          <BellRing className="!w-6 !h-6" strokeWidth={2} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Device Alarms</DrawerTitle>
          <DrawerDescription>
            Click on an alarm to assign it to a user.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {alarms.map((alarm) => (
            <div
              key={alarm.id}
              className="bg-gray-100 p-4 mb-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <strong>{alarm.device}</strong>: {alarm.message}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => assignToWorker(alarm.id)}
                  >
                    Assign
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign this to a worker!</DialogTitle>
                    <DialogDescription>
                      Pick a worker this will be assigned to. He will be notified immediately.
                    </DialogDescription>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a worker" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">John Doe</SelectItem>
                        <SelectItem value="2">Jane Doe</SelectItem>
                        <SelectItem value="3">Alice</SelectItem>
                        <SelectItem value="4">Bob</SelectItem>
                      </SelectContent>
                    </Select>
                  </DialogHeader>
                  <DialogFooter>
                    <Button>Assign</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AlarmsDrawer;
