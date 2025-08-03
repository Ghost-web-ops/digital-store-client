"use client";

import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

// تهيئة Stripe (ضع المفتاح العام هنا من ملف .env.local)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CartPage() {
  const { items, removeFromCart } = useCartStore();

  const totalPrice = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    toast.error("Item removed from cart");
  };

  // --- دالة الدفع الجديدة ---
  const handleCheckout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      // 1. تحدث مع الباك إند لإنشاء جلسة الدفع
      const response = await axios.post(`${apiUrl}/api/checkout/create-checkout-session`, { items });

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
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  <Button variant="destructive" size="sm" onClick={() => handleRemove(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-full max-w-sm p-4 bg-card border rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
              <div className="flex justify-between">
                <p>Total:</p>
                <p className="font-bold text-2xl">${totalPrice.toFixed(2)}</p>
              </div>
              <Button className="w-full mt-4" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}