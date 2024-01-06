import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/core/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: "en" | "jp";
  };
};

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(inter.className)}
    >
      <body
        className={cn(
          "bg-surface-container font-body relative overflow-x-clip font-light transition-colors duration-300",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
