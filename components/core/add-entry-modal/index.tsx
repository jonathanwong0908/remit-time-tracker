import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

type AddEntryModalTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AddEntryModalTrigger = ({
  children,
  className,
}: AddEntryModalTriggerProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>hi</DialogContent>
    </Dialog>
  );
};

export default AddEntryModalTrigger;
