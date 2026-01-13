import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Mazlis Drive",
  description: "Mazlis Drive - Your Cloud Storage Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 5000 }}
          className="toaster z-100 bg-white dark:bg-gray-900"
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
