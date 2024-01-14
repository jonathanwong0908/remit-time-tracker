import React, { useState } from "react";
import { Category } from "../category-select";
import { cn } from "@/lib/utils";

type CategoryButtonProps = {
  category: Category;
  index: number;
};

const CategoryButton = ({ category }: CategoryButtonProps) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      className="grid cursor-pointer place-items-center"
      onClick={handleClick}
    >
      <span
        className={cn(
          "grid select-none place-items-center rounded-full border px-3 py-1 text-sm",
          selected
            ? "bg-surface-container-highest text-display-inverted"
            : "bg-transparent",
        )}
      >
        {category.name}
      </span>
    </div>
  );
};

export default CategoryButton;
