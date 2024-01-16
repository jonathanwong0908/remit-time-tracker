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
import { AmPmToggle } from ".";
import { cn } from "@/lib/utils";
import { getHours } from "date-fns";

const StartTimeInput = () => {
  const form = useFormContext<z.infer<typeof addEntryFormSchema>>();

  const [amPm, setAmPm] = useState<"am" | "pm">(
    getHours(new Date()) < 12 ? "am" : "pm",
  );

  let previousValue = ""; // Keep track of the previous value

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;

    // If the user tries to input more than 5 characters, keep the previous value
    if (currentValue.length > 5) {
      currentValue = previousValue;
    } else {
      // If the user backspaces at the third position, remove the last two characters
      if (currentValue.length === 2 && previousValue.length === 3) {
        currentValue = currentValue.slice(0, 1);
      } else {
        // Remove non-numeric characters (except for the colon)
        currentValue = currentValue.replace(/[^0-9:]/g, "");

        // Convert 24-hour format to 12-hour format
        if (currentValue.length >= 2) {
          let hours = parseInt(currentValue.slice(0, 2));
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          currentValue =
            hours.toString().padStart(2, "0") + currentValue.slice(2);

          // Set amPm based on the hour
          setAmPm(hours < 12 ? "am" : "pm");
        }

        // Add colon after two digits or if a third digit is being entered
        if (
          (currentValue.length === 2 && currentValue.indexOf(":") === -1) ||
          (currentValue.length === 3 && previousValue.length === 2)
        ) {
          currentValue = currentValue.slice(0, 2) + ":" + currentValue.slice(2);
        }

        // Limit the fourth digit to 5
        if (currentValue.length === 4) {
          const fourthDigit = parseInt(currentValue[3]);
          if (fourthDigit >= 6) {
            currentValue = currentValue.slice(0, 3) + "5";
          }
        }

        // Limit the second part to 59
        if (currentValue.length > 4) {
          const minutes = parseInt(currentValue.slice(3));
          if (minutes > 59) {
            currentValue = currentValue.slice(0, 3) + "59";
          }
        }
      }
    }

    previousValue = currentValue; // Update the previous value
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
                    "cursor-pointer",
                    amPm === "am" && "cursor-default border-b text-display",
                  )}
                  onClick={() => setAmPm("am")}
                >
                  AM
                </span>
                <span
                  className={cn(
                    "cursor-pointer",
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
