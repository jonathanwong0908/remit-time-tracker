import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./config/locale";

export const localePrefix = "always"; // Default

const myLocales = locales.map((locale) => locale.name);

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: myLocales, localePrefix });
