"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useI18n } from "../../../locales/client";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const t = useI18n();
  const { clearCart } = useCartStore();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // هذا الـ Hook سيتم تشغيله مرة واحدة فقط عند تحميل الصفحة
  useEffect(() => {
    if (sessionId) {
      // في تطبيق حقيقي، يجب التحقق من sessionId عبر الـ API
      // لكن الآن، سنكتفي بتفريغ السلة
      clearCart();
      toast.success("Payment successful!");
    }
  }, [sessionId, clearCart]); // الاعتمادية تضمن تشغيله مرة واحدة
  if (!sessionId) {
    return (
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">{t('SuccessPage.invalidAccessTitle')}</h1>
        <p>{t('SuccessPage.invalidAccessMessage')}</p>
      </main>
    );
  }
  return (
    <main className="container mx-auto flex flex-col items-center justify-center text-center min-h-[calc(100vh-150px)]">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-foreground mb-2">
        {t("SuccessPage.title")}
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        {t("SuccessPage.message")}
      </p>
      <Button asChild>
        <Link href="/">{t("SuccessPage.backButton")}</Link>
      </Button>
    </main>
  );
}
