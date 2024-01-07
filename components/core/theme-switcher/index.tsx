"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleClick() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (!mounted) {
    return null;
  }

  return (
    <Button className="" variant="ghost" size="icon" onClick={handleClick}>
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeSwitcher;
