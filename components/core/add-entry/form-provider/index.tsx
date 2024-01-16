import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { addHours, format } from "date-fns";

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
  className?: string;
};

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
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form?.handleSubmit(onSubmit)} className={className}>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};

export default AddEntryFormProvider;
