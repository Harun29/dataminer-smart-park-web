import { Info, TriangleAlert } from "lucide-react";
import { Progress } from "./ui/progress";

interface AlarmInfoProps {
  severity: number;
  name: string;
  value: number;
}

const AlarmInfo = ({ name, value, severity }: AlarmInfoProps) => {
  return (
    <div className={`p-4 flex flex-col items-center gap-2 w-full text-white ${severity === 1 ? "bg-blue-300" : severity === 2 ? "bg-yellow-300" : "bg-red-300"}`}>
      <div className="flex items-center gap-2">
        {
          severity === 1 && <Info />
        }
        {
          severity === 2 && <TriangleAlert />
        }
        {
          severity === 3 && <TriangleAlert />
        }
        <span>{name}</span>
        <span>{value}% full</span>
      </div>
      <div className="w-full row-span-2">
        <Progress className="text-white" value={value} />
      </div>
    </div>
  );
};

export default AlarmInfo;