"use client";

import { BellRing, Info, TriangleAlert } from "lucide-react";
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
  DrawerTrigger,
} from "./ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";
import { useAuth } from "@/app/context/authContext";

interface Alarm {
  id: number;
  name: string;
  value: number;
  severity: "low" | "medium" | "high";
}

const AlarmsDrawer = () => {
  const { isAdmin } = useAuth();

  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: 1, name: "Trash Can", value: 65, severity: "low" },
    { id: 2, name: "Light2", value: 0, severity: "medium" },
    { id: 3, name: "Bench1", value: 33, severity: "high" },
    { id: 4, name: "Light2", value: 0, severity: "medium" },
    { id: 5, name: "Light2", value: 0, severity: "medium" },
    { id: 6, name: "Bench1", value: 33, severity: "high" },
    { id: 7, name: "Bench1", value: 33, severity: "high" },
    { id: 8, name: "Light2", value: 0, severity: "medium" },
    { id: 9, name: "Bench1", value: 33, severity: "high" },
    { id: 10, name: "Bench1", value: 33, severity: "high" },
    { id: 11, name: "Trash Can", value: 65, severity: "low" },
    { id: 12, name: "Bench1", value: 33, severity: "high" },
    { id: 13, name: "Bench1", value: 66, severity: "low" },
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

        {/* Scrollable container */}
        <div className=" overflow-x-auto custom-scrollbar m-6">
          <div className="flex space-x-3 min-w-max">
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className="bg-gray-100 rounded-lg overflow-hidden w-44 flex-none flex flex-col justify-between items-center h-64 mb-4"
              >
                <div
                  className={`p-4 flex flex-col items-center gap-2 w-full h-4/5 text-white ${
                    alarm.severity === "low"
                      ? "bg-blue-300"
                      : alarm.severity === "medium"
                      ? "bg-yellow-300"
                      : "bg-red-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {alarm.severity === "low" && <Info className="h-16 w-16" />}
                    {alarm.severity === "medium" && (
                      <TriangleAlert className="h-16 w-16" />
                    )}
                    {alarm.severity === "high" && (
                      <TriangleAlert className="h-16 w-16" />
                    )}
                    <span>{alarm.name}</span>
                    <span>{alarm.value}% full</span>
                  </div>
                  <div className="w-full">
                    <Progress className="text-white" value={alarm.value} />
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger
                    disabled={alarm.severity === "low"}
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
