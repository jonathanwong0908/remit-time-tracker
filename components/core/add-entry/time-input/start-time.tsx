import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Clock3 } from "lucide-react";
import React from "react";

const EndTimeInput = () => {
  const [isAM, setIsAm] = React.useState(true);

  return (
    <div className="flex items-center justify-between rounded border px-2 py-2">
      <span className="pr-1.5 ">
        <Clock3 size={14} className="text-muted" />
      </span>
      <Input className="w-full min-w-0 border-none p-0 shadow-none" />
      <div className="flex gap-1 pl-1.5 text-xs text-muted">
        <span className={cn("", isAM && "text-display")}>AM</span>
        <span className={cn("")}>PM</span>
      </div>
    </div>
  );
};

export default EndTimeInput;
