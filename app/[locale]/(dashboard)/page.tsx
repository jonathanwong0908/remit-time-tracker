import { LocaleString } from "@/config/locale";
import { useTranslations } from "next-intl";
import React from "react";
import AddRecordForm from "./(components)/add-record-form";

type HomePageProps = {
  params: {
    locale: LocaleString;
  };
};

export default function Home({ params: { locale } }: HomePageProps) {
  const t = useTranslations("index");

  return (
    <main className="grid place-items-center">
      <AddRecordForm />
    </main>
  );
}
