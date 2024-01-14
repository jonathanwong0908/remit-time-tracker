import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const addEntryFormSchema = z.object({
  description: z.string().optional(),
  category: z.string(),
  subCategory: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  timeSpent: z.string(),
});

type AddEntryFormProviderProps = {
  children: React.ReactNode;
};

const AddEntryFormProvider = ({ children }: AddEntryFormProviderProps) => {
  const form = useForm<z.infer<typeof addEntryFormSchema>>({
    resolver: zodResolver(addEntryFormSchema),
    defaultValues: {
      // Your default values...
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export default AddEntryFormProvider;
