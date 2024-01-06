export type Locale = {
  name: string;
  prefix: string;
  display: string;
  label: String;
};

export type LocaleString = "en" | "jp";

export const locales: Locale[] = [
  {
    name: "en",
    prefix: "en",
    display: "English",
    label: "EN",
  },
  {
    name: "jp",
    prefix: "jp",
    display: "日本語",
    label: "日",
  },
];

export const localeTranslations: Record<string, string> = {
  en: "English",
  jp: "日本語",
};
