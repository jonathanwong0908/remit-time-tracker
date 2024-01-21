import { Input } from "@/components/ui/input";
import { Clock3 } from "lucide-react";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddEntryFormContext } from "@/context/AddEntryContext";

const EndTimeInput = () => {
  const form = useAddEntryFormContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;

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
      if (hours > 23) {
        currentValue = currentValue.slice(0, 1);
      }
    }

    // Limit the fourth digit to 5
    if (currentValue.length === 4) {
      const fourthDigit = parseInt(currentValue[3]);
      if (fourthDigit >= 6) {
        currentValue = currentValue.slice(0, 3) + "5";
      }
    }

    // Add colon after two digits
    if (currentValue.length > 2) {
      currentValue = currentValue.slice(0, 2) + ":" + currentValue.slice(2);
    }

    form?.setValue("endTime", currentValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;

    // If the user has only entered the hour part, add ":00" to the end
    if (currentValue.length === 2) {
      currentValue = currentValue + ":00";
    }

    // If the user has entered the hour and part of the minute, add the missing digit
    else if (currentValue.length === 4) {
      currentValue = currentValue + "0";
    }

    form?.setValue("endTime", currentValue);
    form?.updateTimeSpent();
  };

  return (
    <FormField
      control={form?.control}
      name="endTime"
      render={({ field }) => (
        <FormItem>
          <FormLabel>End time</FormLabel>
          <FormControl>
            <div className="flex items-center justify-between rounded border px-3 py-2">
              <Input
                type="text"
                placeholder="HH:MM"
                className="w-full min-w-0 border-none p-0 shadow-none"
                {...field}
                value={field?.value || ""}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <span className="">
                <Clock3 size={14} className="text-muted" />
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EndTimeInput;
