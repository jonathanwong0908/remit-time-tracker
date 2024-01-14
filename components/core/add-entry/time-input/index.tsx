import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { addEntryFormSchema } from "..";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Clock3 } from "lucide-react";

type AddEntryTimeInputProps = {
  form: UseFormReturn<z.infer<typeof addEntryFormSchema>>;
};

const AddEntryTimeInput = ({ form }: AddEntryTimeInputProps) => {
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex w-full items-start justify-between gap-2">
          <FormField
            control={form?.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-between rounded border px-2 py-2">
                    <span className="pr-1.5 ">
                      <Clock3 size={14} className="text-muted" />
                    </span>
                    <Input
                      className="w-full min-w-0 border-none p-0 shadow-none"
                      {...field}
                    />
                    <AmPmToggle date={new Date()} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form?.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-between rounded border px-2 py-2">
                    <span className="pr-1.5 ">
                      <Clock3 size={14} className="text-muted" />
                    </span>
                    <Input
                      className="w-full min-w-0 border-none p-0 shadow-none"
                      {...field}
                    />
                    <AmPmToggle date={new Date()} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <FormField
        control={form?.control}
        name="timeSpent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time Spent</FormLabel>
            <FormControl>
              <Input className="px-3 py-2 shadow-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddEntryTimeInput;

type AmPmToggleProps = {
  date: Date;
};

const AmPmToggle = ({ date }: AmPmToggleProps) => {
  const isAm = date.getHours() < 12;

  return (
    <div className="flex gap-1 pl-1.5 text-xs text-muted">
      <span className={cn("", isAm && "border-b text-display")}>AM</span>
      <span className={cn("", !isAm && "border-b text-display")}>PM</span>
    </div>
  );
};
