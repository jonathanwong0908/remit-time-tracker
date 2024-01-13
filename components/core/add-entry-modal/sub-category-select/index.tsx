import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CategoryButton from "../category-button";

const SubCategorySelect = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);

  const handleOpenChange = (opened: boolean) => {
    setPopoverOpened(opened);
  };

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
  }, [updateWidth]);

  return (
    <Popover onOpenChange={(opened) => handleOpenChange(opened)}>
      <PopoverTrigger
        ref={triggerRef}
        className="w-full overflow-hidden rounded border ring-0"
      >
        <div className="flex w-full items-center justify-between px-3 py-2 transition hover:bg-surface-container-high">
          <span className="text-sm text-muted">Pick a sub-category</span>
          <motion.span animate={{ rotate: popoverOpened ? 180 : 0 }}>
            <ChevronDown size={14} className="text-muted" />
          </motion.span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("rounded bg-surface-container p-3")}
        align="start"
        sideOffset={10}
        style={{ width: `${popoverWidth}px` }}
      >
        <div className="text-sm text-muted">Pick a category first</div>
      </PopoverContent>
    </Popover>
  );
};

export default SubCategorySelect;
