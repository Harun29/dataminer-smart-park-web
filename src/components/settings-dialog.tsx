"use client";

import ThresholdType from "@/types/ThresholdType";
import { CheckCircle2, Loader2, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

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
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Label } from "./ui/label";
import { useSensors } from "@/app/context/sensorsContext";

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [thresholds, setThresholds] = useState<ThresholdType[]>([]);
  const [selectedType, setSelectedType] = useState<string>();
  const [limits, setLimits] = useState<number[]>([]);
  const [uniqueSensorTypes, setUniqueSensorTypes] = useState<string[]>([]);
  const [infoValue, setInfoValue] = useState("0");
  const [warningValue, setWarningValue] = useState("0");
  const [urgentValue, setUrgentValue] = useState("0");
  const [loading, setLoading] = useState(false);
  const {readings} = useSensors();

  useEffect(() => {
    const fetchSensorTypes = async () => {
      try {
        console.log("Fetching sensor types...");
        const response = await fetch("https://localhost:7206/api/Category");
        if (!response.ok) {
          throw new Error("Failed to fetch sensor types");
        }
        const data = await response.json();
        const sensorTypes = data
          .find((category: { categoryNumber: number }) => category.categoryNumber === 2)
          ?.categoryNames || [];
  
        // Filter sensor types based on readings
        const filteredSensorTypes = sensorTypes.filter((type: string) =>
          readings.some((sensor) => sensor.sensorType === type)
        );
  
        setUniqueSensorTypes(filteredSensorTypes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSensorTypes();
  }, [selectedType, readings]);

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
      } catch (err) {
        console.error(err);
      }
    };

    fetchThresholds();
  }, []);

  useEffect(() => {
    const fetchLimits = async () => {
      try {
        console.log("Fetching limits...");
        const response = await fetch(
          `https://localhost:7206/api/Treshold/GetLimits?type=${selectedType}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch thresholds");
        }
        const data = (await response.json()) as number[];
        setLimits(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (selectedType) {
      const selectedThresholds = thresholds
        .filter((item) => item.deviceName === selectedType)
        .sort((a, b) => a.limit - b.limit);

      if (selectedThresholds.length > 0) {
        setInfoValue(selectedThresholds[0].limit.toString());
        setWarningValue(selectedThresholds[1].limit.toString());
        setUrgentValue(selectedThresholds[2].limit.toString());
      }
      fetchLimits();
    }
  }, [selectedType]);

  const handleSave = async () => {
    setLoading(true);
    const updateThresholds = async (
      id: number,
      limit: number,
      type: number
    ) => {
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

    const values = [
      parseInt(infoValue),
      parseInt(warningValue),
      parseInt(urgentValue),
    ];
    let typeCounter = 1;
    const promises = thresholds
      .filter((item) => item.deviceName === selectedType)
      .map((item, index) => {
        const promise = updateThresholds(
          item.id,
          values[index % values.length],
          typeCounter
        );
        typeCounter++;
        return promise;
      });

    await Promise.all(promises);
    setLoading(false);
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
              <div>
                <Label className="text-muted-foreground">Info</Label>
                <Input
                  placeholder="info"
                  className="bg-blue-300"
                  value={infoValue}
                  onChange={(e) => setInfoValue(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Warning</Label>
                <Input
                  placeholder="warning"
                  className="bg-yellow-300"
                  value={warningValue}
                  onChange={(e) => setWarningValue(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Urgent</Label>
                <Input
                  placeholder="urgent"
                  className="bg-red-300"
                  value={urgentValue}
                  onChange={(e) => setUrgentValue(e.target.value)}
                />
              </div>
            </div>
            <Alert className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>How does this work?</AlertTitle>
              <AlertDescription>
                The thresholds for this sensor type is set in range from{" "}
                <strong>{limits[0]}</strong> to <strong>{limits[1]}</strong>.
                The <strong>info</strong> threshold is the lowest value, the{" "}
                <strong>warning</strong> threshold is the middle value, and the{" "}
                <strong>urgent</strong> threshold is the highest value.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="rounded-full bg-blue-400 "
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
