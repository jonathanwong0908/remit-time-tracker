import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AddEntryCalendar from "../calendar";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import * as z from "zod";
import { addEntryFormSchema } from "..";

type DateSelectProps = {
  watch: UseFormWatch<z.infer<typeof addEntryFormSchema>>;
  setValue: UseFormSetValue<z.infer<typeof addEntryFormSchema>>;
};

const DateSelect = ({ watch, setValue }: DateSelectProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);
  const [popoverOpened, setPopoverOpened] = useState<boolean>(false);

  const selectedDate = watch("date");

  const updateWidth = () => {
    if (triggerRef?.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        (triggerRef.current === event.target ||
          (!triggerRef.current.contains(event.target as Node) &&
            popoverContentRef.current &&
            !popoverContentRef.current.contains(event.target as Node)))
      ) {
        setPopoverOpened(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPopoverOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setPopoverOpened(false);
    }
  }, [selectedDate]);

  return (
    <Popover open={popoverOpened}>
      <PopoverTrigger
        ref={triggerRef}
        className="w-full overflow-hidden rounded border ring-0"
      >
        <div
          onClick={() => setPopoverOpened(!popoverOpened)}
          className="flex w-full items-center justify-between px-3 py-2 transition hover:bg-surface-container-high"
        >
          <span className="text-sm text-muted">Select start date</span>
          <span>
            <CalendarDays size={14} className="text-muted" />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        ref={popoverContentRef}
        className={cn("rounded bg-surface-container p-4")}
        align="start"
        sideOffset={10}
        style={{ width: `${popoverWidth}px` }}
      >
        <AddEntryCalendar watch={watch} setValue={setValue} />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelect;