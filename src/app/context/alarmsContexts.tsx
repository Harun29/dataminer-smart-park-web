"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AlarmType from '@/types/AlarmType';
import { useAuth } from './authContext';
import {toast} from "sonner";

type AlarmsContextType = {
  alarms: AlarmType[];
  myAlarms: AlarmType[];
  setMyAlarms: React.Dispatch<React.SetStateAction<AlarmType[]>>;
  fetchSensorReadings: () => Promise<void>;
  activeSensor: number | null;
  setActiveSensor: React.Dispatch<React.SetStateAction<number | null>>;
};

const AlarmsContext = createContext<AlarmsContextType | undefined>(undefined);

interface AlarmsProviderProps {
  children: React.ReactNode;
}

export const AlarmsProvider: React.FC<AlarmsProviderProps> = ({ children }) => {
  const [alarms, setAlarms] = useState<AlarmType[]>([]);
  const [myAlarms, setMyAlarms] = useState<AlarmType[]>([]);
  const { user } = useAuth();
  const [activeSensor, setActiveSensor] = useState<number | null>(null);
  const prevAssignmentsRef = useRef<AlarmType[]>([]);
  const prevAlarmsRef = useRef<AlarmType[]>([]);

  const fetchSensorReadings = async () => {
    try {
      console.log("Fetching alarms readings...");
      const response = await fetch('https://localhost:7206/api/Alarm');
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const data = await response.json() as AlarmType[];
      console.log(data);
      setAlarms(data);

      const newAlarms = data.filter(alarm => !prevAlarmsRef.current.some(prevAlarm => prevAlarm.id === alarm.id));
      newAlarms.forEach(alarm => {
        toast.error(`New alarm: ${alarm.senyorType}`, );
      });

      prevAlarmsRef.current = data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMyAlarms = async () => {
    try {
      console.log("Fetching my alarms...");
      const response = await fetch(`https://localhost:7206/api/Alarm/getByUserId?userId=${user?.id}`);
      if (!response.ok) {
        throw new Error('HTTP error! status: ' + response.status);
      }
      const data = await response.json() as AlarmType[];
      setMyAlarms(data);

      const newAlarms = data.filter(alarm => !prevAssignmentsRef.current.some(prevAlarm => prevAlarm.id === alarm.id));
      newAlarms.forEach(alarm => {
        toast.error(`New assignment: ${alarm.senyorType}`, );
      });

      prevAssignmentsRef.current = data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSensorReadings();
    const interval = setInterval(fetchSensorReadings, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user) {
      fetchMyAlarms();
      const interval = setInterval(fetchMyAlarms, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AlarmsContext.Provider value={{ alarms, myAlarms, setMyAlarms, fetchSensorReadings, activeSensor, setActiveSensor }}>
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