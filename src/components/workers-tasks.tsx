import AlarmInfo from "./alarm-info";
import { Button } from "./ui/button";

const WorkersTasks = () => {
  return (
    <div>
      <div className="task-item rounded-lg overflow-hidden m-3 cursor-pointer hover:scale-105 transform transition-transform">
        <AlarmInfo name="Bench1" value={66} severity="medium" />
        <Button variant="outline" className="mark-as-done-button rounded-none w-full">Mark As Done!</Button>
      </div>
      <div className="task-item rounded-lg overflow-hidden m-3 cursor-pointer hover:scale-105 transform transition-transform">
        <AlarmInfo name="TrashCan1" value={65} severity="high" />
        <Button variant="outline" className="mark-as-done-button rounded-none w-full">Mark As Done!</Button>
      </div>
      <div className="task-item rounded-lg overflow-hidden m-3 cursor-pointer hover:scale-105 transform transition-transform">
        <AlarmInfo name="TrashCan1" value={65} severity="high" />
        <Button variant="outline" className="mark-as-done-button rounded-none w-full">Mark As Done!</Button>
      </div>
      <div className="task-item rounded-lg overflow-hidden m-3 cursor-pointer hover:scale-105 transform transition-transform">
        <AlarmInfo name="Bench2" value={33} severity="medium" />
        <Button variant="outline" className="mark-as-done-button rounded-none w-full">Mark As Done!</Button>
      </div>
      <div className="task-item rounded-lg overflow-hidden m-3 cursor-pointer hover:scale-105 transform transition-transform">
        <AlarmInfo name="TrashCan1" value={65} severity="high" />
        <Button variant="outline" className="mark-as-done-button rounded-none w-full">Mark As Done!</Button>
      </div>
    </div>
  );
};

export default WorkersTasks;
