import { Info, Trash, TriangleAlert } from "lucide-react";
import { Progress } from "./ui/progress";

interface AlarmInfoProps {
  severity: "low" | "medium" | "high";
  name: string;
  value: number;
}

const AlarmInfo = ({ name, value, severity }: AlarmInfoProps) => {
  return (
    <div className={`p-4 flex flex-col items-center gap-2 w-full text-white ${severity === "low" ? "bg-blue-300" : severity === "medium" ? "bg-yellow-300" : "bg-red-300"}`}>
      <div className="flex items-center gap-2">
        {
          severity === "low" && <Info />
        }
        {
          severity === "medium" && <TriangleAlert />
        }
        {
          severity === "high" && <TriangleAlert />
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