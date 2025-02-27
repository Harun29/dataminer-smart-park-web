"use client";

import { useAlarms } from "@/app/context/alarmsContexts";
import { useAuth } from "@/app/context/authContext";
import { BellRing, Info, TriangleAlert } from "lucide-react";
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
  DrawerTrigger,
} from "./ui/drawer";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";


const AlarmsDrawer = () => {
  const { isAdmin } = useAuth();
  const {alarms} = useAlarms();

  const assignToWorker = (alarmId: number) => {
    console.log(`Assigning alarm ${alarmId} to user`);
  };

  return (alarms &&
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

        <div className=" overflow-x-auto custom-scrollbar m-6">
          <div className="flex space-x-3 min-w-max">
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className="bg-gray-100 rounded-lg overflow-hidden w-44 flex-none flex flex-col justify-between items-center h-64 mb-4"
              >
                <div
                  className={`p-4 flex flex-col items-center gap-2 w-full h-4/5 text-white ${
                    alarm.level === 0
                      ? "bg-blue-300"
                      : alarm.level === 1
                      ? "bg-yellow-300"
                      : "bg-red-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {alarm.level === 1 && <Info className="h-16 w-16" />}
                    {alarm.level === 2 && (
                      <TriangleAlert className="h-16 w-16" />
                    )}
                    {alarm.level === 3 && (
                      <TriangleAlert className="h-16 w-16" />
                    )}
                    <span>{alarm.sensorType}</span>
                    <span>{alarm.capacity}% full</span>
                  </div>
                  <div className="w-full">
                    <Progress className="text-white" value={alarm.capacity} />
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger
                    disabled={alarm.level === 0}
                    className="h-1/5 w-full"
                    asChild
                  >
                    <Button
                      variant="ghost"
                      onClick={() => assignToWorker(alarm.id)}
                    >
                      Assign
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {isAdmin
                          ? "Assign this to a worker!"
                          : "Assign this to yourself!"}
                      </DialogTitle>
                      <DialogDescription>
                        {isAdmin
                          ? "Pick a worker this will be assigned to. They will be notified immediately."
                          : "Assign this alarm to yourself. You will be notified imidiately."}
                      </DialogDescription>
                      {isAdmin && (
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
                      )}
                    </DialogHeader>
                    <DialogFooter>
                      <Button>Assign</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AlarmsDrawer;
