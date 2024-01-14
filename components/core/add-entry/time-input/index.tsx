import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

const AddEntryTimeInput = () => {
  const [isAM, setIsAM] = React.useState(true);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-start gap-3">
        <Label>Time</Label>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="rounded border px-3 py-2">
            <Input className="w-full min-w-0 border-none p-0 shadow-none" />
          </div>

          <div className="grid place-items-center">
            <div className="h-0.5 w-1 rounded-full bg-primary" />
          </div>

          <div className="rounded border px-3 py-2">
            <Input className="w-full min-w-0 border-none p-0 shadow-none" />
          </div>
        </div>
      </div>

      <div className="flex w-1/4 flex-col items-start gap-3">
        <Label>Time spent</Label>
        <Input className="px-3 py-2 shadow-none" />
      </div>
    </div>
  );
};

export default AddEntryTimeInput;
