"use client";

import * as React from "react";
import { CheckCircle2, Droplet, Lamp, Trash, Triangle } from "lucide-react";
import { useState, useEffect } from "react";
import ThresholdType from "@/types/ThresholdType";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

const data = {
  nav: [
    {
      name: "Trash Can",
      icon: Trash,
      type: "trash",
      description: "Set the threshold for trash can alerts.",
    },
    {
      name: "Lights",
      icon: Lamp,
      type: "lights",
      description: "Set the threshold for light alerts.",
    },
    {
      name: "Fountain",
      icon: Triangle,
      type: "fountain",
      description: "Set the threshold for fountain alerts.",
    },
    {
      name: "Soil",
      icon: Droplet,
      type: "soil",
      description: "Set the threshold for soil moisture alerts.",
    },
  ],
};

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [thresholds, setThresholds] = useState<ThresholdType[]>([]);
  const [selectedType, setSelectedType] = useState<string>();
  const [uniqueSensorTypes, setUniqueSensorTypes] = useState<string[]>([]);
  const [infoValue, setInfoValue] = useState("0");
  const [warningValue, setWarningValue] = useState("0");
  const [urgentValue, setUrgentValue] = useState("0");

  useEffect(() => {
    const fetchThresholds = async () => {
      try {
        console.log("Fetching thresholds...");
        const response = await fetch("https://localhost:7206/api/Treshold");
        if (!response.ok) {
          throw new Error("Failed to fetch thresholds");
        }
        const data = (await response.json()) as ThresholdType[];
        setThresholds(data);

        const sensorTypes = Array.from(
          new Set(data.map((item) => item.deviceName))
        );
        setUniqueSensorTypes(sensorTypes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchThresholds();
  }, []);

  useEffect(() => {
    if (selectedType) {
      const selectedThresholds = thresholds
        .filter((item) => item.deviceName === selectedType)
        .sort((a, b) => a.limit - b.limit);

      if (selectedThresholds.length > 0) {
        setInfoValue(selectedThresholds[0].limit.toString());
        setWarningValue(selectedThresholds[1].limit.toString());
        setUrgentValue(selectedThresholds[2].limit.toString());
      }
    }
  }, [selectedType]);

  const handleSave = async () => {
    const updateThresholds = async (id: number, limit: number, type: number ) => {
      try {
        console.log("id: ", id, "limit: ", limit, "type: ", type);
        const response = await fetch(
          `https://localhost:7206/api/Treshold/${id}?Limit=${limit}&Type=${type}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, limit, type }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to update threshold");
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    const values = [parseInt(infoValue), parseInt(warningValue), parseInt(urgentValue)];
    let typeCounter = 1;
    const promises = thresholds
      .filter((item) => item.deviceName === selectedType)
      .map((item, index) => {
        const promise = updateThresholds(item.id, values[index % values.length], typeCounter);
        typeCounter++;
        return promise;
      });
  
    await Promise.all(promises);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <VisuallyHidden>
          <Button size="sm">Open Dialog</Button>
        </VisuallyHidden>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust Alert Thresholds</DialogTitle>
          <DialogDescription>
            Set the alert thresholds for different sensor types.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <Select onValueChange={(value) => setSelectedType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sensor Type" />
            </SelectTrigger>
            <SelectContent>
              {uniqueSensorTypes.map((item, index) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="flex items-center space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <span>{item}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div>
            <h3 className="font-semibold">{selectedType}</h3>
            <p className="mb-4 text-sm text-gray-500">
              Set the threshold for {selectedType} alerts.
            </p>
            <div className="flex w-full gap-2">
              <Input
                placeholder="info"
                className="bg-blue-300"
                value={infoValue}
                onChange={(e) => setInfoValue(e.target.value)}
              />
              <Input
                placeholder="warning"
                className="bg-yellow-300"
                value={warningValue}
                onChange={(e) => setWarningValue(e.target.value)}
              />
              <Input
                placeholder="urgent"
                className="bg-red-300"
                value={urgentValue}
                onChange={(e) => setUrgentValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="mt-4 rounded-full">
            <CheckCircle2 />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
