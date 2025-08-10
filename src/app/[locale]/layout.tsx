import type { Metadata } from "next";
import "./globals.css"; // تأكد من أن المسار صحيح
 // استدعاء المكون الجديد

import { I18nProviderClient } from '../../locales/client';
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Digital Store | Premium Digital Products & Assets",
  description: "Your one-stop shop for high-quality digital products...",
  icons: {
    icon: '/favicon.png', // <-- أضف هذا السطر
  },
};

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
      className="min-h-screen flex flex-col justify-between">
        <AuthProvider>
        <Toaster reverseOrder={false} />
        <I18nProviderClient locale={locale}>
          <Navbar />
          {/* هنا تضع باقي الـ Providers مثل AuthProvider والـ Navbar */}
           <main className="flex-grow">{children}</main> 
           <Footer />
        </I18nProviderClient>

        </AuthProvider>
      </body>
    </html>
  );
}