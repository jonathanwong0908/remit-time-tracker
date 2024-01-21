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
import { add, format, parse } from "date-fns";

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

    // Add colon after two digits
    if (currentValue.length > 2) {
      currentValue = currentValue.slice(0, 2) + ":" + currentValue.slice(2);
    }

    // Prevent the third number from being larger than 5
    if (currentValue.length === 4) {
      const thirdNumber = parseInt(currentValue[3]);
      if (thirdNumber > 5) {
        currentValue = currentValue.slice(0, 3) + "5";
      }
    }

    form?.setValue("endTime", currentValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;

    if (currentValue?.length === 0) {
      const startTimeString = form?.getValues("startTime");
      const timeSpentString = form?.getValues("timeSpent");

      if (startTimeString && timeSpentString) {
        // Parse the start time and time spent
        const startTime = parse(startTimeString, "HH:mm", new Date());
        const timeSpent = timeSpentString.split(":").map(Number);

        // Add the time spent to the start time to get the end time
        const endTime = add(startTime, {
          hours: timeSpent[0],
          minutes: timeSpent[1],
        });

        // Format the end time as a string and set it in the form
        const endTimeString = format(endTime, "HH:mm");
        form?.setValue("endTime", endTimeString);
      }

      form?.updateTimeSpent();
      return;
    }

    // If the user has only entered one digit, add "0" in front and ":00" at the back
    if (currentValue.length === 1) {
      currentValue = "0" + currentValue + ":00";
    }

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
