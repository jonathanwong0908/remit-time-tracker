import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import CategoryButton from "../category-button";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { addEntryFormSchema } from "../form-provider";

const CategorySelect = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);

  const form = useFormContext<z.infer<typeof addEntryFormSchema>>();

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
  }, []);

  return (
    <Popover onOpenChange={(opened) => handleOpenChange(opened)}>
      <PopoverTrigger
        ref={triggerRef}
        className="w-full overflow-hidden rounded border"
      >
        <div className="flex w-full items-center justify-between px-3 py-2 transition hover:bg-surface-container-high">
          <span className="text-sm text-muted">Pick a category</span>
          <motion.span animate={{ rotate: popoverOpened ? 180 : 0 }}>
            <ChevronDown size={14} className="text-muted" />
          </motion.span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("rounded bg-surface-container p-0")}
        align="start"
        sideOffset={10}
        style={{ width: `${popoverWidth}px` }}
      >
        <div className="flex items-center gap-4 border-b">
          <Search size={18} className="ml-4 text-muted" />
          <Input
            className="rounded-none border-none px-0 py-3 text-sm shadow-none"
            placeholder="Search category"
          />
        </div>
        <div className="my-2 flex flex-wrap gap-4 p-4">
          {categories.map((category, index) => (
            <CategoryButton
              category={category}
              key={category?.id}
              index={index}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelect;

export const categories: Category[] = [
  {
    id: 1,
    name: "Productivity",
    theme: "red",
  },
  {
    id: 2,
    name: "Relationships",
    theme: "orange",
  },
  {
    id: 3,
    name: "Health",
    theme: "yellow",
  },
  {
    id: 4,
    name: "Hobbies",
    theme: "green",
  },
  {
    id: 5,
    name: "Rest",
    theme: "blue",
  },
];

export type Category = {
  id: number;
  name: string;
  theme: string;
};

export type SubCategory = {
  id: number;
  name: string;
  categoryId: number;
};
