import { Input } from "@/components/ui/input";
import { Clock3 } from "lucide-react";
import React from "react";
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

const StartTimeInput = () => {
  const form = useFormContext<z.infer<typeof addEntryFormSchema>>();

  return (
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
  );
};

export default StartTimeInput;
