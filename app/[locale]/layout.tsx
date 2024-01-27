import type { Metadata } from "next";
import "../../styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/core/theme-provider";
import SideNav from "@/components/core/side-nav";
import { poppins } from "@/lib/fonts";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";

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
  const messages = useMessages();

  return (
    <ClerkProvider>
      <html
        lang={locale}
        suppressHydrationWarning
        className={cn(poppins.className)}
      >
        <body
          className={cn(
            "font-body relative overflow-x-clip bg-surface-container font-light transition-colors duration-300",
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["light", "dark"]}
          >
            <NextIntlClientProvider messages={messages}>
              <div className="relative flex min-h-screen">
                <SideNav />
                <div className="p-6">{children}</div>
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
