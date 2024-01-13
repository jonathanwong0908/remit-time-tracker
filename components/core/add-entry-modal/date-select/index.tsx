import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DateSelect = () => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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

  return (
    <Popover>
      <PopoverTrigger
        ref={triggerRef}
        className="w-full overflow-hidden rounded border ring-0"
      >
        <div className="flex w-full items-center justify-between px-3 py-2 transition hover:bg-surface-container-high">
          <span className="text-sm text-muted">Pick a sub-category</span>
          <span>
            <CalendarDays size={14} className="text-muted" />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("rounded bg-surface-container p-3")}
        align="start"
        sideOffset={10}
        style={{ width: `${popoverWidth}px` }}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelect;
