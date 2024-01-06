"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChevronLeft,
  Cuboid,
  LayoutDashboard,
  Settings,
  Timer,
} from "lucide-react";
import React, { useState } from "react";

const SideNav = () => {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <aside className="sticky top-0 hidden h-full min-h-screen w-[270px] border-r lg:block">
      <div className="flex min-h-screen flex-col justify-between">
        <div className="">
          <div className="flex items-center justify-between border-b p-6">
            <div className="w-full  text-2xl">Remit.</div>
            <Button
              variant="ghost"
              size="icon"
              // onClick={() => setOpened((prev) => !prev)}
              className="h-8 w-8"
            >
              <ChevronLeft size={16} />
            </Button>
          </div>

          <div className="grid gap-14 p-6">
            {sideNavItems.map((navItem) => (
              <div key={navItem?.name} className="grid gap-3 text-sm">
                <span className="text-xs text-muted">{navItem?.title}</span>
                <div className="grid gap-2">
                  {navItem?.items.map((item) => (
                    <div
                      key={item?.name}
                      className="flex items-center gap-2 rounded border"
                    >
                      <div className="grid h-8 w-8 place-items-center">
                        <item.Icon />
                      </div>
                      <span>{item?.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-6">bottom</div>
      </div>
    </aside>
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
