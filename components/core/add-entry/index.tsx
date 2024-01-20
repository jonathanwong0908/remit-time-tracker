import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import React from "react";
import AddEntryFormProvider from "@/context/AddEntryContext";
import AddEntryForm from "./add-entry-form";

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
        {/* wrap the form inside this and make another component that uses the useFormContextHook */}
        <AddEntryFormProvider className="mt-6 space-y-8">
          <AddEntryForm />
        </AddEntryFormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModalTrigger;
