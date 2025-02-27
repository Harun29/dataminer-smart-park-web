"use client";

import { motion } from "framer-motion";
import {
  Lamp,
  RockingChair,
  Trash,
  Triangle,
  Zap
} from "lucide-react";
import { useState } from "react";
import { MenuButton } from "./menu-button";
import { Progress } from "./ui/progress";
import {  useSensors} from "@/app/context/sensorsContext";

interface SensorInfoProps {
  type?: string;
}

const SensorInfo = ({ type = "default" }: SensorInfoProps) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {readings} = useSensors();

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
          {type === "Bench" && <RockingChair size={openSidebar ? 24 : 20} />}
          {type === "Fountain" && <Triangle size={openSidebar ? 24 : 20} />}
          {type === "Power" && <Zap size={openSidebar ? 24 : 20} />}
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
            className="mt-6 grid gap-4 opacity-0 text-xs font-semibold overflow-y-scroll custom-scrollbar w-full h-[calc(100%-48px)]"
          >
            {readings.map((reading) => (
              <div key={reading.id} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center gap-2 w-full text-white">
                <div className="flex items-center gap-2">
                  <span>{reading.name}</span>
                  <span>{reading.value} {reading.unit}</span>
                </div>
                <div className="w-full">
                  <Progress className="text-white" value={reading.value}/>
                </div>
              </div>
            ))}
            {/* Trash can
            <div className="bg-yellow-500 rounded-lg p-4 flex flex-col items-center gap-2 w-full text-white">
              <div className="flex items-center gap-2">
                <Trash size={20} />
                <span>Trash can</span>
                <span>65% full</span>
              </div>
              <div className="w-full row-span-2">
                <Progress className="text-white" value={65}/>
              </div>
              <span className="text-sm">Needs emptying in about: 34min.</span>
            </div> */}

            
          </motion.div>
        )}
      </motion.div>
      
    </>
  );
};

export default SensorInfo;
