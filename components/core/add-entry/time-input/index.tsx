import React from "react";
import { cn } from "@/lib/utils";
import StartTimeInput from "./start-time";
import EndTimeInput from "./end-time";
import TimeSpentInput from "./time-spent";

const AddEntryTimeInput = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex w-full items-start justify-between gap-2">
          <StartTimeInput />

          <EndTimeInput />
        </div>
      </div>

      <TimeSpentInput />
    </div>
  );
};

export default AddEntryTimeInput;

type AmPmToggleProps = {
  date: Date;
};

export const AmPmToggle = ({ date }: AmPmToggleProps) => {
  const isAm = date.getHours() < 12;

  return (
    <div className="flex gap-1 pl-1.5 text-xs text-muted">
      <span className={cn("", isAm && "border-b text-display")}>AM</span>
      <span className={cn("", !isAm && "border-b text-display")}>PM</span>
    </div>
  );
};
