import { Input } from "@/components/ui/input";
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

const TimeSpentInput = () => {
  const form = useFormContext<z.infer<typeof addEntryFormSchema>>();

  return (
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
  );
};

export default TimeSpentInput;
