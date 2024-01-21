"use client";

import React, { createContext, useContext } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { MutationStatus } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import {
  addHours,
  differenceInHours,
  differenceInMinutes,
  format,
  parse,
} from "date-fns";

type AddEntryFormProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export type AddEntryFormContextType = UseFormReturn<
  z.infer<typeof addEntryFormSchema>
> & {
  updateTimeSpent: () => void;
};

const AddEntryFormContext = createContext<AddEntryFormContextType | null>(null);

export const addEntryFormSchema = z.object({
  description: z.string().optional(),
  category: z.string(),
  subCategory: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  timeSpent: z.string(),
});

const AddEntryFormProvider = ({
  children,
  className,
}: AddEntryFormProviderProps) => {
  const form = useForm<z.infer<typeof addEntryFormSchema>>({
    resolver: zodResolver(addEntryFormSchema),
    defaultValues: {
      date: new Date(),
      startTime: format(new Date(), "HH:MM"),
      endTime: format(addHours(new Date(), 1), "HH:MM"),
      timeSpent: "01:00",
    },
  });

  const onSubmit = (data: z.infer<typeof addEntryFormSchema>) => {
    console.log(data);
  };

  const updateTimeSpent = () => {
    const startTimeString = form?.getValues("startTime");
    const endTimeString = form?.getValues("endTime");

    if (startTimeString && endTimeString) {
      const startTime = parse(startTimeString, "HH:mm", new Date());
      const endTime = parse(endTimeString, "HH:mm", new Date());

      let hoursDifference = differenceInHours(endTime, startTime);
      let minutesDifference = differenceInMinutes(endTime, startTime) % 60;

      if (hoursDifference < 0) {
        hoursDifference = hoursDifference + 24;
      }

      const timeSpent = `${hoursDifference < 10 ? "0" : ""}${hoursDifference}:${
        minutesDifference < 10 ? "0" : ""
      }${minutesDifference}`;

      form?.setValue("timeSpent", timeSpent);
    }
  };

  return (
    <AddEntryFormContext.Provider value={{ ...form, updateTimeSpent }}>
      <Form {...form}>
        <form onSubmit={form?.handleSubmit(onSubmit)} className={className}>
          {children}
        </form>
      </Form>
    </AddEntryFormContext.Provider>
  );
};

export const useAddEntryFormContext = () => useContext(AddEntryFormContext);

export default AddEntryFormProvider;
