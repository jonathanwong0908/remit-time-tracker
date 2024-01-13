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

type AddEntryModalTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AddEntryModalTrigger = ({
  children,
  className,
}: AddEntryModalTriggerProps) => {
  const t = useTranslations("add-new");
  // fix modal width
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogTitle>{t("title")}</DialogTitle>
        <div className="space-y-12 pt-8">
          <div className="space-y-4">
            <span>Time and Date</span>
            <div className="space-y-8">
              <div>
                <Label>Starting time</Label>
              </div>
              <div>
                <Label>Time spent</Label>
              </div>
              <div className="flex flex-col items-start gap-3">
                <Label>Date</Label>
                <DateSelect />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <span>Details</span>
            <div className="space-y-8">
              <div className="min-w-0 space-y-3">
                <Label>Description</Label>
                <Textarea
                  placeholder="What did you do? (optional)"
                  className="h-24 resize-none text-sm font-normal"
                />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Label>Category</Label>
                <CategorySelect />
              </div>
              <div className="flex flex-col items-start gap-3">
                <Label>Sub-category</Label>
                <SubCategorySelect />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModalTrigger;
