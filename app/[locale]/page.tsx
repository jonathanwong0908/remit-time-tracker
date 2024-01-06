import { LocaleString } from "@/config/locale";
import { useTranslations } from "next-intl";
import React from "react";

type HomePageProps = {
  params: {
    locale: LocaleString;
  };
};

export default function Home({ params: { locale } }: HomePageProps) {
  const t = useTranslations("index");

  return (
    <main className="grid place-items-center">
      <h1>{t("title")}</h1>
    </main>
  );
}
