type AlarmType = {
    id: number;
    senzorId: number;
    senyorType: string;
    level: number;
    capacity: number;
    consumption: string;
    korisnikId: number | null;
}

export default AlarmType;