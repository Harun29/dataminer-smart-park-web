import { Info, TriangleAlert } from "lucide-react";
import { Progress } from "./ui/progress";

interface AlarmInfoProps {
  severity: number;
  name: string;
  value: number;
  unit: string;
}

const AlarmInfo = ({ name, value, unit,  severity }: AlarmInfoProps) => {
  return (
    <div className={`p-4 flex flex-col items-center gap-2 w-full text-white ${severity === 1 ? "bg-blue-300" : severity === 2 ? "bg-yellow-300" : "bg-red-300"}`}>
      <div className="flex items-center gap-2 text-black">
        {
          severity === 1 && <Info />
        }
        {
          severity === 2 && <TriangleAlert />
        }
        {
          severity === 3 && <TriangleAlert />
        }
        <span className="font-medium text-sm text-black" >{name}</span>
        <span className="font-medium text-black">{value}{unit}</span>
      </div>
      <div className="w-full row-span-2">
        <Progress className="text-white" value={value} />
      </div>
    </div>
  );
};

export default AlarmInfo;