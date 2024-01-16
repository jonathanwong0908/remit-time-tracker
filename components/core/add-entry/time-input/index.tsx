import React from "react";
import { cn } from "@/lib/utils";
import StartTimeInput from "./start-time";
import EndTimeInput from "./end-time";
import TimeSpentInput from "./time-spent";

const AddEntryTimeInput = () => {
  return (
    <div className="flex gap-4">
      <div className="flex w-full items-start justify-between gap-4">
        <StartTimeInput />

        <EndTimeInput />
      </div>

      <TimeSpentInput />
    </div>
  );
};

export default AddEntryTimeInput;

type AmPmToggleProps = {
  value: "am" | "pm" | null;
};

export const AmPmToggle = ({ value }: AmPmToggleProps) => {
  return (
    <div className="flex gap-1 pl-2 text-xs text-muted">
      <span className={cn("", value === "am" && "border-b text-display")}>
        AM
      </span>
      <span className={cn("", value === "pm" && "border-b text-display")}>
        PM
      </span>
    </div>
  );
};
