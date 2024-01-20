import { Input } from "@/components/ui/input";
import { Clock3 } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { addEntryFormSchema } from "../form-provider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { getHours } from "date-fns";
import { useAddEntryFormContext } from "@/context/AddEntryContext";

const StartTimeInput = () => {
  const form = useAddEntryFormContext();
  const [amPm, setAmPm] = useState<"am" | "pm">(
    getHours(new Date()) < 12 ? "am" : "pm",
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    const previousValue = form?.getValues("startTime") || "";

    // Remove non-numeric characters
    currentValue = currentValue.replace(/[^0-9]/g, "");

    // Limit the input to 4 digits
    if (currentValue.length > 4) {
      currentValue = currentValue.slice(0, 4);
    }

    // Prevent the user from inputting anything larger than 2 on the first digit
    if (currentValue.length >= 1) {
      const firstDigit = parseInt(currentValue[0]);
      if (firstDigit > 2) {
        currentValue = "";
      }
    }

    // Prevent the user from inputting 24 or above
    if (currentValue.length >= 2) {
      const hours = parseInt(currentValue.slice(0, 2));
      if (hours > 24) {
        currentValue = currentValue.slice(0, 1);
      } else if (hours === 24 && currentValue.length > 2) {
        // If the hours are exactly 24, don't allow any more input
        currentValue = currentValue.slice(0, 2);
      }
    }

    // Limit the fourth digit to 5
    if (currentValue.length === 4) {
      const fourthDigit = parseInt(currentValue[3]);
      if (fourthDigit >= 6) {
        currentValue = currentValue.slice(0, 3) + "5";
      }
    }

    // Convert 24-hour format to 12-hour format and set AM/PM
    if (currentValue.length >= 2) {
      let hours = parseInt(currentValue.slice(0, 2));

      // Set amPm based on the original hour, but only if the hours are being entered and the input is increasing in length
      if (
        currentValue.length <= 2 &&
        currentValue.length > previousValue.length
      ) {
        setAmPm(hours < 12 || hours === 24 ? "am" : "pm");
      }

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      currentValue =
        hours.toString().padStart(2, "0") + currentValue.slice(2, 4);
    }

    // Add colon after two digits
    if (currentValue.length > 2) {
      currentValue = currentValue.slice(0, 2) + ":" + currentValue.slice(2);
    }

    form?.setValue("startTime", currentValue);
  };

  return (
    <FormField
      control={form?.control}
      name="startTime"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Start</FormLabel>
          <FormControl>
            <div className="flex items-center justify-between rounded border px-2 py-2">
              <span className="pr-2 ">
                <Clock3 size={14} className="text-muted" />
              </span>
              <Input
                type="text"
                placeholder="HH:MM"
                className="w-full min-w-0 border-none p-0 shadow-none"
                {...field}
                value={field?.value || ""}
                onChange={handleInputChange}
              />
              <div className="flex gap-1 pl-2 text-xs text-muted">
                <span
                  className={cn(
                    "cursor-pointer transition",
                    amPm === "am" && "cursor-default border-b text-display",
                  )}
                  onClick={() => setAmPm("am")}
                >
                  AM
                </span>
                <span
                  className={cn(
                    "cursor-pointer transition",
                    amPm === "pm" && "cursor-default border-b text-display",
                  )}
                  onClick={() => setAmPm("pm")}
                >
                  PM
                </span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StartTimeInput;
