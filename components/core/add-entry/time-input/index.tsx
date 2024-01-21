import React from "react";
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
