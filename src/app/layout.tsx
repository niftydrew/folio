import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingProvider } from "@/components/loading-provider";

const switzer = localFont({
  src: "../../fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  title: "0xDrew - Developer",
  description:
    "0xDrew is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge(
          switzer.className,
          "flex antialiased h-screen overflow-hidden"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingProvider>
            <Sidebar />
            <div className="lg:pl-2 lg:pt-2 bg-gray-100 dark:bg-neutral-950 flex-1 overflow-y-auto">
              <div className="flex-1 bg-white dark:bg-neutral-900 min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 dark:lg:border-neutral-800 overflow-y-auto">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
