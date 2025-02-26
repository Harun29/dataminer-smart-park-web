"use client";

import * as React from "react";
import { CheckCircle2, Droplet, Lamp, Trash, Triangle } from "lucide-react";

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

type ThresholdType = "trash" | "lights" | "fountain" | "soil";

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [thresholds, setThresholds] = React.useState<
    Record<ThresholdType, number>
  >({
    trash: 50,
    lights: 75,
    fountain: 50,
    soil: 50,
  });
  const [selectedType, setSelectedType] =
    React.useState<ThresholdType>("trash");

  const handleSliderChange = (type: ThresholdType, value: number) => {
    setThresholds((prev) => ({ ...prev, [type]: value }));
  };

  const handleSave = () => {
    console.log("Saved thresholds:", thresholds);
    // Add your save logic here
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
          <Select
            onValueChange={(value) => setSelectedType(value as ThresholdType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sensor Type" />
            </SelectTrigger>
            <SelectContent>
              {data.nav.map((item) => (
                <SelectItem
                  key={item.type}
                  value={item.type}
                  className="flex items-center space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon strokeWidth={1} />
                    <span>{item.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {data.nav.map(
            (item) =>
              item.type === selectedType && (
                <div key={item.type}>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="mb-4 text-sm text-gray-500">
                    {item.description}
                  </p>
                  <div className="flex w-full gap-2">
                    <Input placeholder="info" className="bg-blue-300" />
                    <Input placeholder="warning" className="bg-yellow-300" />
                    <Input placeholder="urgent" className="bg-red-300" />
                  </div>
                </div>
              )
          )}
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
