import { LocaleString } from "@/config/locale";
import React from "react";
import LanguageSwitcher from "../locale-switcher";
import ThemeSwitcher from "../theme-switcher";

type NavbarProps = {
  locale: LocaleString;
};

const Navbar = ({ locale }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-surface-container px-4 py-3">
      <div className=" container flex justify-between">
        <div className="grid place-items-center">
          <span>Remit</span>
        </div>
        <div className="flex gap-3">
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
