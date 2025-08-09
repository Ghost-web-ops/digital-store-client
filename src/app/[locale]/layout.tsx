import type { Metadata } from "next";
import "./globals.css"; // تأكد من أن المسار صحيح
 // استدعاء المكون الجديد

import { I18nProviderClient } from '../../locales/client';
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";


export const metadata: Metadata = {
  title: "Digital Products Store",
  description: "Your one-stop shop for amazing digital products.",
};

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <AuthProvider>
        <I18nProviderClient locale={locale}>
          <Navbar />
          {/* هنا تضع باقي الـ Providers مثل AuthProvider والـ Navbar */}
          {children}
        </I18nProviderClient>
        </AuthProvider>
      </body>
    </html>
  );
}