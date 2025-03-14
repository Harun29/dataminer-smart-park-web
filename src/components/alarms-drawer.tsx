"use client";

import { useAlarms } from "@/app/context/alarmsContexts";
import { useAuth } from "@/app/context/authContext";
import { BellRing, Info, Loader2, TriangleAlert } from "lucide-react";
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
import { useState, useEffect } from "react";
import UserType from "@/types/UserType";
import {toast} from "sonner";


const AlarmsDrawer = () => {
  const { isAdmin, user } = useAuth();
  const { alarms, setActiveSensor } = useAlarms();
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://localhost:7206/api/Korisnik");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const usersList = await response.json();
        setUsers(usersList);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const assignToWorker = async (alarmId: number, korisnikId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7206/api/Alarm/UpdateAlarm?alarmId=${alarmId}&korisnikId=${korisnikId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(`Assigned alarm ${alarmId} to user ${korisnikId}`);
      toast.success("Alarm assigned successfully!");
    } catch (error) {
      console.error("Failed to assign alarm:", error);
      toast.error("Failed to assign alarm!");
    } finally{
      setLoading(false);
    }
  };

  return (
    alarms &&
    users &&
    user && (
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
            <DrawerTitle className="text-2xl">Device Alarms</DrawerTitle>
            <DrawerDescription className="text-lg">
              Click on an alarm to assign it to a user.
            </DrawerDescription>
          </DrawerHeader>

          <div className=" overflow-x-auto custom-scrollbar m-6">
            <div className="flex space-x-3 min-w-max p-4">
              {alarms.map((alarm) => (
                <div
                  onClick={() => setActiveSensor(alarm.senzorId)}
                  key={alarm.id}
                  className="cursor-pointer hover:-translate-y-3 transition-all z-50 bg-gray-100 rounded-lg overflow-hidden w-44 flex-none flex flex-col justify-between items-center h-64 mb-4"
                >
                  <div
                    className={`p-4 flex flex-col items-center gap-2 w-full h-4/5 text-white ${
                      (alarm.level === 1 || alarm.level === 0)
                        ? "bg-blue-300"
                        : alarm.level === 2
                        ? "bg-yellow-300"
                        : "bg-red-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {(alarm.level === 1 || alarm.level === 0) && <Info className="h-16 w-16" />}
                      {alarm.level === 2 && (
                        <TriangleAlert className="h-16 w-16" />
                      )}
                      {alarm.level === 3 && (
                        <TriangleAlert className="h-16 w-16" />
                      )}
                      <span className="text-center">{alarm.senyorType}</span>
                      <span>{alarm.capacity}{alarm.unit}</span>
                    </div>
                    <div className="w-full">
                      <Progress className="text-white" value={alarm.capacity} />
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger
                      disabled={alarm.level === 0 || alarm.level === 1 || alarm.korisnikId !== null}
                      className="h-1/5 w-full"
                      asChild
                    >
                      <Button variant="ghost">
                        {alarm.korisnikId !== null ? "Assigned" : "Assign"}
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
                            : "Assign this alarm to yourself. You will be notified immediately."}
                        </DialogDescription>
                        {isAdmin && (
                          <Select
                            onValueChange={(value) =>
                              setSelectedUserId(Number(value))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a worker" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.ime} {user.prezime}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          className="rounded-full bg-blue-400 text-white"
                          disabled={(isAdmin && !selectedUserId) || loading}
                          onClick={() => {
                            if (isAdmin && selectedUserId !== null) {
                              assignToWorker(alarm.id, selectedUserId);
                            } else if (!isAdmin && user?.id) {
                              assignToWorker(alarm.id, parseInt(user.id));
                            }
                          }}
                        >
                          {loading && <Loader2 className="animate-spin mr-2" />}
                          Assign
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  );
};

export default AlarmsDrawer;
