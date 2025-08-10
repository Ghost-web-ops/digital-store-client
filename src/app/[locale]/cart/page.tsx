"use client";

import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useI18n } from "../../../locales/client";
import { Plus, Minus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// تهيئة Stripe (ضع المفتاح العام هنا من ملف .env.local)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CartPage() {
  const { token, isLoggedIn } = useAuth();
  const t = useI18n();
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  const totalPrice = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    toast.error("Item removed from cart");
  };

  // --- دالة الدفع الجديدة ---
  const handleCheckout = async () => {
    if (!isLoggedIn || !token) {
      toast.error("You must be logged in to proceed to checkout.");
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      // 1. تحدث مع الباك إند لإنشاء جلسة الدفع
      const response = await axios.post(
        `${apiUrl}/api/checkout/create-checkout-session`,
        { items },
        {
          headers: {
            // 👇 The Fix is Here 👇
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const session = response.data;

      // 2. استخدم Stripe.js لإعادة توجيه المستخدم لصفحة الدفع
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) {
          toast.error(error.message || "An error occurred during redirect.");
        }
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Something went wrong with the checkout process.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center">
        {t("CartPage.title")}
      </h1>

      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            {t("CartPage.emptyMessage")}
          </p>
          <Button asChild size="sm" className="text-sm sm:text-base">
            <Link href="/">{t("CartPage.continueShopping")}</Link>
          </Button>
        </div>
      ) : (
        <div>
          <div className="space-y-4 sm:space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="w-full sm:w-auto">
                  <h2 className="font-semibold text-base sm:text-lg">
                    {item.name}
                  </h2>
                  {/* Quantity Section */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm sm:text-base">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increaseQuantity(item.id)}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("CartSummary.quantity")} {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <p className="font-semibold text-base sm:text-lg">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                    className="text-sm sm:text-base"
                  >
                    {t("CartSummary.remove")}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex justify-end">
            <div className="w-full sm:w-80 lg:w-96 p-4 bg-card border rounded-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                {t("CartSummary.title")}
              </h2>
              <div className="flex justify-between">
                <p className="text-sm sm:text-base">{t("CartSummary.total")}</p>
                <p className="font-bold text-lg sm:text-2xl">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <Button
                className="w-full mt-4 text-sm sm:text-base"
                onClick={handleCheckout}
              >
                {t("CartSummary.checkoutButton")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
