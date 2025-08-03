import type { Metadata } from "next";
import "./globals.css"; // تأكد من أن هذا المسار صحيح
import { AuthProvider } from "@/contexts/AuthContext"; // المسار الصحيح لـ AuthContext
import { I18nProviderClient } from "../../locales/client"; // المسار الصحيح لـ I18nProviderClient

export const metadata: Metadata = {
  title: "Digital Products Store",
  description: "Your one-stop shop for amazing digital products.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params; // <-- نحصل على locale هنا بدلاً من الأعلى

  return (
    
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <AuthProvider>
          <I18nProviderClient locale={locale}>
            {/* Navbar والفوتر سيأتون هنا */}
            {children}
          </I18nProviderClient>
        </AuthProvider>
      </body>
    </html>
  );
}