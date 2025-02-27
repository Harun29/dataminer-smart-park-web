"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MenuButton } from "./menu-button";
import {
  CloudRain,
  EqualApproximately,
  Info,
  ParkingCircle,
  ShieldPlus,
  Sun,
  Thermometer,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { useSensors } from "@/app/context/sensorsContext";

const BasicInfo = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {basicInfo, totalVisitors} = useSensors();

  useEffect(() =>{
    basicInfo && console.log("basic info: ", basicInfo)
  }, [])

  return (
    <>
      <motion.div
        animate={{
          width: openSidebar ? 380 : 200,
          height: openSidebar ? 360 : 48,
        }}
        onClick={() => {
          if (!openSidebar) {
            setOpenSidebar(!openSidebar);
          }
        }}
        className={`${
          openSidebar && "overflow-y-auto"
        } px-6 py-3 z-[9999] bg-white rounded-3xl shadow-lg border ${
          !openSidebar && "!px-4 cursor-pointer hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <Info size={openSidebar ? 24 : 20} />
          <motion.h1
            animate={{
              fontSize: openSidebar ? "24px" : "14px",
            }}
            className="font-semibold"
          >
            Basic Information
          </motion.h1>
          <div className="cursor-pointer">
            <MenuButton
              isOpen={openSidebar}
              onClick={() => setOpenSidebar(!openSidebar)}
              strokeWidth="2"
              color="#000"
              lineProps={{ strokeLinecap: "round" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              width={openSidebar ? 14 : 12}
              height={openSidebar ? 14 : 12}
            />
          </div>
        </div>

        {openSidebar && (
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 grid gap-4 opacity-0 text-xs font-semibold"
          >
            {basicInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-2 text-lg">
                {info.unit === "°C" && <Thermometer size={20} />}
                {info.unit === "AQI" && <EqualApproximately size={20} />}
                {info.unit === "UV Index" && <ShieldPlus size={20} />}
                {info.unit === "mm/hr" && <CloudRain size={20} />}
                {info.unit === "km/h" && <Wind size={20} />}
                {info.unit !== "%" && `${info.name}: ${info.value} ${info.unit}`}
              </div>
            ))}
            <div className="flex items-center gap-2 text-lg">
              <Users size={20} />
              Total visitors: {totalVisitors}
            </div>
          </motion.div>
        )}
      </motion.div>
      
    </>
  );
};

export default BasicInfo;
