type AlarmType = {
    id: number;
    sensorId: number;
    sensorType: string;
    level: number;
    capacity: number;
    consumption: string;
    korisnikId: number | null;
}

export default AlarmType;