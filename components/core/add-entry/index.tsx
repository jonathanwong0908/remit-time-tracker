import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import React from "react";
import CategorySelect from "./category-select";
import SubCategorySelect from "./sub-category-select";
import DateSelect from "./date-select";
import AddEntryTimeInput from "./time-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type AddEntryModalTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

export const addEntryFormSchema = z.object({
  description: z.string().optional(),
  category: z.string(),
  subCategory: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  timeSpent: z.string(),
});

const AddEntryModalTrigger = ({
  children,
  className,
}: AddEntryModalTriggerProps) => {
  const t = useTranslations("add-new");

  const form = useForm<z.infer<typeof addEntryFormSchema>>({
    resolver: zodResolver(addEntryFormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof addEntryFormSchema>) => {
    console.log(data);
  };
  // fix modal width
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogTitle>{t("title")}</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-8"
          >
            <div className="space-y-4">
              <div className="space-y-8">
                <AddEntryTimeInput form={form} />

                <FormField
                  control={form?.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DateSelect />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-8">
                <FormField
                  control={form?.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What did you do? (optional)"
                          className="h-24 resize-none text-sm font-normal shadow-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form?.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <CategorySelect setValue={form?.setValue} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form?.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub-category</FormLabel>
                      <FormControl>
                        <SubCategorySelect />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModalTrigger;
