"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MenuButton } from "./MenuButton";
import {
  Info,
  ParkingCircle,
  Sun,
  Thermometer,
  Users,
  Zap,
} from "lucide-react";

const BasicInfo = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

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
            <div className="flex items-center gap-2 text-lg">
              <Users size={20} />
              Total visitors: 123
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Thermometer size={20} />
              Temperature: 22°C
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Sun size={20} />
              Weather: Sunny
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Zap size={20} />
              UV Index: 5
            </div>
            <div className="flex items-center gap-2 text-lg">
              <ParkingCircle size={20} />
              Parking status: 3/5 occupied
            </div>
          </motion.div>
        )}
      </motion.div>
      
    </>
  );
};

export default BasicInfo;
