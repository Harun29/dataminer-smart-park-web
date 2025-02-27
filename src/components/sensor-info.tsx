import { Trash } from "lucide-react";
import { Progress } from "./ui/progress";

interface SensorInfoProps {
  name: string;
  value: number;
}

const SensorInfo = ({ name, value }: SensorInfoProps) => {
  return (
    <div className="bg-yellow-500 rounded-lg p-4 flex flex-col items-center gap-2 w-full text-white">
      <div className="flex items-center gap-2">
        <Trash size={20} />
        <span>{name}</span>
        <span>{value}% full</span>
      </div>
      <div className="w-full row-span-2">
        <Progress className="text-white" value={value}/>
      </div>
      <span className="text-sm">Needs attention in about: 34min.</span>
    </div>
  );
};

export default SensorInfo;