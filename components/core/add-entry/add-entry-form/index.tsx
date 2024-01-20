import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddEntryFormContext } from "@/context/AddEntryContext";
import AddEntryTimeInput from "../time-input";
import CategorySelect from "../category-select";
import SubCategorySelect from "../sub-category-select";
import DateSelect from "../date-select";

const AddEntryForm = () => {
  const form = useAddEntryFormContext();

  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default AddEntryForm;
