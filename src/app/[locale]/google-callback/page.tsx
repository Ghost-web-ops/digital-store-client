"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

function GoogleCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        // 1. احصل على التوكن من رابط الصفحة
        const token = searchParams.get('token');

        if (token) {
            // 2. إذا وجدنا التوكن، قم بتسجيل دخول المستخدم
            login(token);
            // 3. أعد توجيهه إلى لوحة التحكم
            router.push('/');
        } else {
            // 4. إذا لم يوجد توكن لأي سبب، أعده لصفحة تسجيل الدخول مع رسالة خطأ
            console.error("Google callback did not receive a token.");
            router.push('/login');
        }
    }, [searchParams, login, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Authenticating, please wait...</p>
        </div>
    );
}

// استخدام Suspense لحماية المكون من أي أخطاء متعلقة بالـ searchParams
export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleCallback />
        </Suspense>
    );
}