"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import ReadingType from '@/types/ReadingType';

type SensorsContextType = {
  readings: ReadingType[];
  powerConsumption: number;
  powerProduction: number;
  basicInfo: ReadingType[];
  totalVisitors: number;
  batteryLevel: number;
  fetchSensorReadings: () => Promise<void>;
};

const SensorsContext = createContext<SensorsContextType | undefined>(undefined);

interface SensorsProviderProps {
  children: React.ReactNode;
}

export const SensorsProvider: React.FC<SensorsProviderProps> = ({ children }) => {
  const [readings, setReadings] = useState<ReadingType[]>([]);
  const [powerConsumption, setPowerConsumption] = useState<number>(0);
  const [powerProduction, setPowerProduction] = useState<number>(0);
  const [basicInfo, setBasicInfo] = useState<ReadingType[]>([]);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [batteryLevel, setBatteryLevel] = useState<number>(0);
  

  const fetchSensorReadings = async () => {
    try {
      console.log("Fetching sensor readings...");
      const response = await fetch('https://localhost:7206/all');
      if (!response.ok) {
        throw new Error('Failed to fetch sensor readings');
      }
      const data = await response.json() as ReadingType[];
      const totalPowerConsumption = data.reduce((acc, reading) => {
        acc += parseInt(reading.consumption);
        return acc;
      }, 0);
      
      const totalPowerProduction = data.reduce((acc, reading) => {
        if (reading.name.includes('Solar')) {
          acc += reading.value;
        }
        return acc;
      }, 0);
      const totalPeople = data.reduce((acc, reading) => {
        if (reading.name.includes('People')) {
          acc += reading.value;
        }
        return acc;
      }, 0);
      const batteryLevelInfo = data.reduce((acc, reading) => {
        if (reading.name.includes('Battery')) {
          acc += reading.value;
        }
        return acc;
      }, 0);

      setReadings(data);
      setBatteryLevel(batteryLevelInfo);
      setTotalVisitors(totalPeople);
      setPowerConsumption(totalPowerConsumption);
      setPowerProduction(totalPowerProduction);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBasicInfo = async () => {
    try{
      const basicInfoExtracted = readings.filter((reading) => reading.coordinates === "");
      setBasicInfo(basicInfoExtracted);
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    readings && fetchBasicInfo();
  
  }, [readings])

  useEffect(() => {
    console.log("basic info in context: ", basicInfo);
  }, [basicInfo])

  useEffect(() => {
    fetchSensorReadings();
  }, []);

  return (
    <SensorsContext.Provider value={{ readings, powerConsumption, powerProduction, basicInfo, totalVisitors, batteryLevel, fetchSensorReadings }}>
      {children}
    </SensorsContext.Provider>
  );
};

export const useSensors = (): SensorsContextType => {
  const context = useContext(SensorsContext);
  if (context === undefined) {
    throw new Error('useSensors must be used within a SensorsProvider');
  }
  return context;
};