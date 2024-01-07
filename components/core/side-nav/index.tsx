"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Cuboid,
  LayoutDashboard,
  Plus,
  Settings,
  Timer,
} from "lucide-react";
import React, { useState } from "react";
import ThemeSwitcher from "../theme-switcher";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import AddEntryModalTrigger from "../add-entry-modal";

const SideNav = () => {
  const [opened, setOpened] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("dashboard");

  const t = useTranslations("nav");

  return (
    <motion.aside
      initial={false}
      animate={{ width: opened ? 270 : 70 }}
      className={cn(
        "sticky top-0 hidden h-full min-h-screen border-r lg:block",
        !opened && "flex justify-center",
      )}
    >
      <div className="flex min-h-screen flex-col justify-between">
        <div className="">
          <div
            className={cn(
              "flex items-center justify-between border-b p-6",
              !opened && "p-4",
            )}
          >
            {opened && <div className="w-full  text-2xl">Remit.</div>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpened((prev) => !prev)}
              className="h-9 w-9 p-0"
            >
              {opened ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </Button>
          </div>

          <div className={cn("px-6 pt-6", !opened && "px-4 pt-4")}>
            <AddEntryModalTrigger>
              <div
                className={cn(
                  "grid h-9 w-full min-w-9 place-items-center rounded bg-primary text-sm text-display-inverted hover:shadow-md",
                )}
              >
                <motion.span>
                  {opened ? t("add-entry") : <Plus size={20} />}
                </motion.span>
              </div>
            </AddEntryModalTrigger>
          </div>

          <div className={cn("grid gap-10 p-6", !opened && "p-4")}>
            {sideNavItems.map((navItem) => (
              <div key={navItem?.name} className="grid gap-2 text-sm">
                {opened && (
                  <motion.span
                    initial={false}
                    className="px-2 text-xs text-muted"
                  >
                    {t(navItem?.name)}
                  </motion.span>
                )}
                <div className="grid gap-1">
                  {navItem?.items.map((item, index) => (
                    <div
                      key={item?.name}
                      onClick={() => setSelectedTab(item?.name)}
                      className={cn(
                        "text-nav flex cursor-pointer items-center gap-3 rounded px-2 py-2",
                        item?.name === selectedTab &&
                          "cursor-default bg-surface-container-high text-display",
                        !opened && "h-9",
                      )}
                    >
                      <div className="flex items-center">
                        <item.Icon />
                      </div>
                      {opened && <motion.span>{t(item?.name)}</motion.span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cn("border-t px-6 py-4", !opened && "px-4")}>
          <div className="flex justify-between">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SideNav;

const sideNavItems = [
  {
    name: "analytics",
    title: "Analytics",
    items: [
      {
        name: "dashboard",
        title: "Dashboard",
        href: "/dashboard",
        Icon: () => <LayoutDashboard size={20} />,
      },
      {
        name: "calendar",
        title: "Calendar",
        href: "/calendar",
        Icon: () => <CalendarDays size={20} />,
      },
    ],
  },
  {
    name: "tools",
    title: "Tools",
    items: [
      {
        name: "tracker",
        title: "Tracker",
        href: "/tracker",
        Icon: () => <Timer size={20} />,
      },
    ],
  },
  {
    name: "manage",
    title: "Manage",
    items: [
      {
        name: "categories",
        title: "Categories",
        href: "/categories",
        Icon: () => <Cuboid size={20} />,
      },
      {
        name: "settings",
        title: "Settings",
        href: "/settings",
        Icon: () => <Settings size={20} />,
      },
    ],
  },
];
