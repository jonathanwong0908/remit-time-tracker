"use client";

import React, { createContext, useContext } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { MutationStatus } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { addHours, format } from "date-fns";

type AddEntryFormProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export type AddEntryFormContextType = UseFormReturn<
  z.infer<typeof addEntryFormSchema>
>;

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
      startTime: format(new Date(), "hh:mm"),
      endTime: format(addHours(new Date(), 1), "hh:mm"),
      timeSpent: "1:00",
    },
  });

  const onSubmit = (data: z.infer<typeof addEntryFormSchema>) => {
    console.log(data);
  };

  return (
    <AddEntryFormContext.Provider value={form}>
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
