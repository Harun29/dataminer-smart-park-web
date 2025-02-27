"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import AlarmType from '@/types/AlarmType';
import { useAuth } from './authContext';

type AlarmsContextType = {
  alarms: AlarmType[];
  myAlarms: AlarmType[];
  fetchSensorReadings: () => Promise<void>;
};

const AlarmsContext = createContext<AlarmsContextType | undefined>(undefined);

interface AlarmsProviderProps {
  children: React.ReactNode;
}

export const AlarmsProvider: React.FC<AlarmsProviderProps> = ({ children }) => {
  const [alarms, setAlarms] = useState<AlarmType[]>([]);
  const [myAlarms, setMyAlarms] = useState<AlarmType[]>([]);
  const {user} = useAuth();

  const fetchSensorReadings = async () => {
    try {
      console.log("Fetching alarms readings...");
      const response = await fetch('https://localhost:7206/api/Alarm');
      if(!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const data = await response.json() as AlarmType[];
      if (user) {
        const myData = data.filter((alarm) => alarm.korisnikId === Number(user.id));
        setMyAlarms(myData);
      }
      setAlarms(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSensorReadings();
  }, []);

  return (
    <AlarmsContext.Provider value={{ alarms, myAlarms, fetchSensorReadings }}>
      {children}
    </AlarmsContext.Provider>
  );
};

export const useAlarms = (): AlarmsContextType => {
  const context = useContext(AlarmsContext);
  if (context === undefined) {
    throw new Error('useSensors must be used within a SensorsProvider');
  }
  return context;
};