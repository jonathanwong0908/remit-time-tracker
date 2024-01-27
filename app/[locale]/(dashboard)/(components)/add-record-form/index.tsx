"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  add,
  addHours,
  differenceInHours,
  differenceInMinutes,
  format,
  isBefore,
  parse,
  startOfToday,
} from "date-fns";
import StartTimeInput from "./start-time";
import EndTimeInput from "./end-time";
import TimeSpentInput from "./time-spent";
import DateSelect from "./date";
import CategorySelect from "./category";
import SubCategorySelect from "./sub-category";
import Description from "./description";
import { Button } from "@/components/ui/button";

export const addRecordFormSchema = z.object({
  description: z.string().optional(),
  category: z.string(),
  subCategory: z.string().optional(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  timeSpent: z.string(),
});

export type AddRecordFormType = z.infer<typeof addRecordFormSchema>;

const AddRecordForm = () => {
  const form = useForm<AddRecordFormType>({
    resolver: zodResolver(addRecordFormSchema),
    defaultValues: {
      date: startOfToday(),
      startTime: format(new Date(), "HH:MM"),
      endTime: format(addHours(new Date(), 1), "HH:MM"),
      timeSpent: "01:00",
    },
  });

  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    setValue,
    watch,
    reset: resetForm,
    formState: { errors },
  } = form;

  const onSubmit = (data: AddRecordFormType) => {
    console.log(data);
  };

  const updateTimeSpent = () => {
    const startTimeString = getValues("startTime");
    const endTimeString = getValues("endTime");

    if (startTimeString && endTimeString) {
      let startTime = parse(startTimeString, "HH:mm", new Date());
      let endTime = parse(endTimeString, "HH:mm", new Date());

      // If the end time is earlier than the start time, add 24 hours to the end time
      if (isBefore(endTime, startTime)) {
        endTime = add(endTime, { hours: 24 });
      }

      let hoursDifference = differenceInHours(endTime, startTime);
      let minutesDifference = differenceInMinutes(endTime, startTime) % 60;

      const timeSpent = `${hoursDifference < 10 ? "0" : ""}${hoursDifference}:${
        minutesDifference < 10 ? "0" : ""
      }${minutesDifference}`;

      setValue("timeSpent", timeSpent);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <StartTimeInput
          updateTimeSpent={updateTimeSpent}
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <EndTimeInput
          updateTimeSpent={updateTimeSpent}
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <TimeSpentInput
          updateTimeSpent={updateTimeSpent}
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
        <DateSelect watch={watch} setValue={setValue} control={control} />
        <CategorySelect control={control} />
        <SubCategorySelect control={control} />
        <Description control={control} />
        <Button type="submit" size="sm" className="text-sm">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddRecordForm;
