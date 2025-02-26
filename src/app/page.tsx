"use client";

import AlarmsDrawer from "@/components/alarms-drawer";
import BasicInfo from "@/components/BasicInfo";
import SensorInfo from "@/components/sensor-info";
import Image from "next/image";

export default function Home() {

  return (
    <div className="h-[100vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/resources/image.png"
          alt="park_satelite"
          width={1920}
          height={1080}
        />
      </div>

      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-4">
        <BasicInfo />
        <SensorInfo type="Trash"/>
        <SensorInfo type="Light"/>
        <SensorInfo type="Bench"/>
        <SensorInfo type="Fountain"/>
      </div>
    </div>
  );
}
