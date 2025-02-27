"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import ReadingType from '@/types/ReadingType';

type SensorsContextType = {
  readings: ReadingType[];
  fetchSensorReadings: () => Promise<void>;
};

const SensorsContext = createContext<SensorsContextType | undefined>(undefined);

interface SensorsProviderProps {
  children: React.ReactNode;
}

export const SensorsProvider: React.FC<SensorsProviderProps> = ({ children }) => {
  const [readings, setReadings] = useState<ReadingType[]>([]);

  const fetchSensorReadings = async () => {
    try {
      console.log("Fetching sensor readings...");
      const response = await fetch('https://localhost:7206/all');
      const data = await response.json() as ReadingType[];
      setReadings(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSensorReadings();
  }, []);

  return (
    <SensorsContext.Provider value={{ readings, fetchSensorReadings }}>
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