type AlarmType = {
    id: number;
    sensorId: number;
    sensorType: string;
    level: number;
    capacity: number;
    consumption: string;
    korisnikIdNumber: number | null;
}

export default AlarmType;