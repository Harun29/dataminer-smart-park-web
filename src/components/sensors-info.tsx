"use client";

import { useSensors } from "@/app/context/sensorsContext";
import { motion } from "framer-motion";
import { Droplet, Lamp, Trash } from "lucide-react";
import { useState } from "react";
import { MenuButton } from "./menu-button";
import { Progress } from "./ui/progress";

interface SensorInfoProps {
  type?: string;
}

const SensorInfo = ({ type = "default" }: SensorInfoProps) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { readings } = useSensors();

  return (
    <>
      <motion.div
        animate={{
          width: openSidebar ? 380 : 140,
          height: openSidebar ? 660 : 48,
        }}
        onClick={() => {
          if (!openSidebar) {
            setOpenSidebar(!openSidebar);
          }
        }}
        className={`$ px-6 py-3 z-[9999] bg-white rounded-3xl shadow-lg border ${
          !openSidebar && "!px-4 cursor-pointer hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center justify-between">
          {type === "Trash" && <Trash size={openSidebar ? 24 : 20} />}
          {type === "Light" && <Lamp size={openSidebar ? 24 : 20} />}
          {type === "Soil" && <Droplet size={openSidebar ? 24 : 20} />}
          <motion.h1
            animate={{
              fontSize: openSidebar ? "24px" : "14px",
            }}
            className="font-semibold"
          >
            {type}
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
            className="flex flex-col mt-6 gap-4 opacity-0 text-xs font-semibold overflow-y-scroll custom-scrollbar w-full h-[calc(100%-48px)]"
          >
            {readings.map((reading) => {
              if (reading.name.includes(type)) {
                return (
                  <div
                    key={reading.id}
                    className={`bg-blue-400 rounded-lg p-4 grid grid-rows-[1fr_auto] items-center gap-2 w-full text-white h-32`}
                  >
                    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                      {type === "Trash" && <Trash size={40}/>}
                      {type === "Light" && <Lamp size={40}/>}
                      {type === "Soil" && <Droplet size={40}/>}
                      <div className="flex flex-col text-lg">
                        <span>{reading.name}</span>
                        <span>
                          Status:{" "}
                          {reading.unit === "Binary"
                            ? reading.value === 1
                              ? "ON"
                              : "OFF"
                            : reading.value + " " + reading.unit}
                        </span>
                      </div>
                    </div>
                    <div className="w-full">
                      {type !== "Light" ? <Progress className="text-white" value={reading.value} /> : 
                      <div className={`w-5 h-5 rounded-full ${reading.value === 1 ? "bg-green-500" : "bg-red-500"}`}></div>
                      }
                    </div>
                  </div>
                );
              }
            })}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default SensorInfo;
