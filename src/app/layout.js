import "./globals.css";

export const metadata = {
  title: "Mazlis Drive",
  description: "Mazlis Drive - Your Cloud Storage Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
