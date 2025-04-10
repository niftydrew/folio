import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingProvider } from "@/components/loading-provider";
import { Toaster } from "@/components/ui/toaster";

const switzer = localFont({
  src: "../../fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  title: "0xDrew | Designer & Developer",
  description:
    "Designer & Developer with 6+ years experience transforming complex challenges into elegant, user-focused web solutions, from initial concept to polished code.",
  keywords: ["web development", "design", "frontend", "React", "Next.js", "TypeScript", "UI/UX", "full-stack"],
  authors: [{ name: "0xDrew" }],
  creator: "0xDrew",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://0xdrew.com",
    title: "0xDrew | Designer & Developer",
    description: "Designer & Developer with 6+ years experience transforming complex challenges into elegant, user-focused web solutions.",
    siteName: "0xDrew"
  },
  twitter: {
    card: "summary_large_image",
    title: "0xDrew | Designer & Developer",
    description: "Designer & Developer with 6+ years experience transforming complex challenges into elegant, user-focused web solutions.",
    creator: "@0xdrew"
  },
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
                <Toaster />
              </div>
            </div>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
