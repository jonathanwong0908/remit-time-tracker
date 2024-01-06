import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/core/theme-switcher";
import LanguageSwitcher from "@/components/core/locale-switcher";

type HomePageProps = {
  params: {
    locale: "en" | "jp";
  };
};

export default function Home({ params: { locale } }: HomePageProps) {
  const t = useTranslations("index");

  return (
    <main className="">
      <h1>{t("title")}</h1>
      <ThemeSwitcher />
      <LanguageSwitcher locale={locale} />
    </main>
  );
}
