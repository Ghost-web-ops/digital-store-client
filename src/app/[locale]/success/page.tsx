"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    const { clearCart } = useCartStore();

    // هذا الـ Hook سيتم تشغيله مرة واحدة فقط عند تحميل الصفحة
    useEffect(() => {
        // نقوم بتفريغ سلة التسوق لأن عملية الشراء نجحت
        clearCart();
    }, [clearCart]); // الاعتمادية تضمن تشغيله مرة واحدة

    return (
        <main className="container mx-auto flex flex-col items-center justify-center text-center min-h-[calc(100vh-150px)]">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                Thank you for your purchase. You will receive an email with your download links and receipt shortly.
            </p>
            <Button asChild>
                <Link href="/">Back to Store</Link>
            </Button>
        </main>
    );
}