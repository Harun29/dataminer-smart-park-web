"use client";

import BasicInfo from "@/components/basic-info";
import ElectricityInfo from "@/components/electricity-info";
import MapView from "@/components/map/map";
import SensorInfo from "@/components/sensors-info";
import { useCallback, useState } from "react";

export default function Home() {
  

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="h-[calc(100vh)] w-[calc(100vw)]">
        <MapView />
      </div>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-4">
        <BasicInfo />
        <SensorInfo type="Trash" />
        <SensorInfo type="Light" />
        <SensorInfo type="Bench" />
        <SensorInfo type="Fountain" />
      </div>
        <ElectricityInfo consumption={50} production={40} />
    </div>
  );
}
