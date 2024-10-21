import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Construction Site Management",
  description: "Manage construction workers and their floor assignments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="container mx-auto py-4 flex justify-between items-center px-4">
              <h1 className="text-lg font-light underline py-2 border-l-2 border-r-2 border-dashed border-red-500 text-red-500 dark:text-yellow-300 dark:border-yellow-300">
                RFID Positioning and Alert System
              </h1>
              <div className="flex space-x-6">
                <Nav />
                <ModeToggle />
              </div>
            </header>
            <main className="container mx-auto">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
