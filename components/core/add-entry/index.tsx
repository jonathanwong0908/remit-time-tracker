import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import React from "react";
import CategorySelect from "./category-select";
import SubCategorySelect from "./sub-category-select";
import DateSelect from "./date-select";
import AddEntryTimeInput from "./time-input";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AddEntryFormProvider, { addEntryFormSchema } from "./form-provider";

type AddEntryModalTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AddEntryModalTrigger = ({
  children,
  className,
}: AddEntryModalTriggerProps) => {
  const t = useTranslations("add-new");

  const form = useFormContext<z.infer<typeof addEntryFormSchema>>();
  // fix modal width
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogTitle>{t("title")}</DialogTitle>
        {/* wrap the form inside this and make another component that uses the useFormContextHook */}
        <AddEntryFormProvider className="mt-6 space-y-8">
          <div className="space-y-4">
            <div className="space-y-8">
              <AddEntryTimeInput />

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
                      <CategorySelect />
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
          <div className="flex gap-8">
            <Button
              type="submit"
              size="sm"
              className="w-1/2 text-sm"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="w-1/2 text-sm">
              Add
            </Button>
          </div>
        </AddEntryFormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModalTrigger;
