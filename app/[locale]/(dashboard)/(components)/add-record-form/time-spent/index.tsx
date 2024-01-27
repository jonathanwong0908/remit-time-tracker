import { Input } from "@/components/ui/input";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddEntryFormContext } from "@/context/AddEntryContext";
import { addHours, addMinutes, format, parse } from "date-fns";
import { Timer } from "lucide-react";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { AddRecordFormType } from "..";

type TimeSpentInputProps = {
  setValue: UseFormSetValue<AddRecordFormType>;
  getValues: UseFormGetValues<AddRecordFormType>;
  control: Control<AddRecordFormType>;
  updateTimeSpent: () => void;
};

const TimeSpentInput = ({
  setValue,
  getValues,
  control,
  updateTimeSpent,
}: TimeSpentInputProps) => {
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

    setValue("timeSpent", currentValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;

    if (currentValue?.length === 0) {
      updateTimeSpent();
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

    setValue("timeSpent", currentValue);

    const startTimeString = getValues("startTime");
    const timeSpentString = getValues("timeSpent");

    if (startTimeString && timeSpentString) {
      // Parse the start time and time spent
      const startTime = parse(startTimeString, "HH:mm", new Date());
      const timeSpent = timeSpentString.split(":").map(Number);

      // Add the time spent to the start time to get the end time
      const endTime = addMinutes(
        addHours(startTime, timeSpent[0]),
        timeSpent[1],
      );

      // Format the end time as a string
      const endTimeString = format(endTime, "HH:mm");

      setValue("endTime", endTimeString);
    }
  };

  return (
    <FormField
      control={control}
      name="timeSpent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time Spent</FormLabel>
          <FormControl>
            <div className="flex items-center justify-between rounded border px-3 py-2">
              <Input
                placeholder="HH:MM"
                className="w-full min-w-0 border-none p-0 shadow-none"
                {...field}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <span className="">
                <Timer size={14} className="text-muted" />
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TimeSpentInput;
