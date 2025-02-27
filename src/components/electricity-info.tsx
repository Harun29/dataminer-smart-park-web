"use client";

import { Zap } from "lucide-react";

interface ElectricityInfoProps {
  consumption: number;
  production: number;
}

const ElectricityInfo = ({ consumption, production }: ElectricityInfoProps) => {
  return (
    <div className="fixed top-4 right-4 flex flex-col px-4 py-3 bg-white rounded-3xl shadow-lg border cursor-pointer transition-all duration-300">
      <div className="flex items-center gap-2">
        <Zap size={20} className="text-yellow-500" />
        <span className="font-semibold text-gray-900">Park Electricity</span>
      </div>

      <div className="flex flex-col justify-between items-end text-sm text-gray-700 mt-2">
        <span className="text-red-500">Consumption</span>
        <span className="text-red-600 text-2xl text-bold">
          {consumption}KW/h
        </span>
      </div>

      <div className="flex flex-col justify-between items-end text-sm text-gray-700">
        <span className="text-green-500">Production</span>
        <span className="text-green-600 text-2xl font-medium">
          {production}KW/h
        </span>
      </div>
    </div>
  );
};

export default ElectricityInfo;
