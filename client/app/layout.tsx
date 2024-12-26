import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhwani",
  description: "Dhwani is a platform for streamlining interactions between supervisors, therapists and patients.",
  icons: ["/meta-logo.png"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}`}
      >
        {children}
      </body>
    </html>
  );
}
