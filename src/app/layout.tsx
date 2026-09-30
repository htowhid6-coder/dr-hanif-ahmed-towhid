import type { Metadata, Viewport } from "next";
import { Playfair_Display, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#edfdf6",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-playfair",
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://drhaniftowhid.com'),
  title: "Dr. Hanif Ahmed Towhid - General Medicine Specialist | Sylhet",
  description: "Official website of Dr. Hanif Ahmed Towhid, Medicine Specialist (Department of Medicine, Sylhet MAG Osmani Medical College Hospital) practicing at Popular Medical Center, Sylhet. MBBS, BCS (Health), MCPS, FCPS (Medicine).",
  verification: {
    google: "doIQ0gi0nKa-5IFfnIubQQdWr3qOHhQekxY-v_C-vS0",
  },
  other: {
    "google-site-verification": "doIQ0gi0nKa-5IFfnIubQQdWr3qOHhQekxY-v_C-vS0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${playfair.variable} ${hind.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="doIQ0gi0nKa-5IFfnIubQQdWr3qOHhQekxY-v_C-vS0" />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
