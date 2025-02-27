type ReadingType = {
  id: string;
  name: string;
  lowerBound: number;
  upperBound: number;
  value: number;
  unit: string;
  consumption: string;
  zone: string;
  sensorType: string;
  coordinates: string;
  isActive: boolean;
}

export default ReadingType;