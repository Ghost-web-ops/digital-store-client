"use client";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import toaster from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useI18n } from '../../../locales/client';

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // تأكد من تعيين هذا المتغير في ملف .env.local
  const t = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); // أو الصفحة الرئيسية مثلاً
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return null; // أو عرض لودر
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });
      login(response.data.token); // استدعاء دالة تسجيل الدخول من AuthContext
      router.push("/"); // توجيه المستخدم للصفحة الرئيسية بعد تسجيل الدخول
      toaster.success("Login successful!"); // عرض رسالة نجاح
      console.log("Login successful:");
      // هنا يمكنك إعادة توجيه المستخدم أو عرض رسالة نجاح
    } catch (error) {
      toaster.error("Login failed. Please check your credentials."); // عرض رسالة خطأ
      console.error("Login failed:", error);
      // هنا يمكنك عرض رسالة خطأ للمستخدم
    }
  };

  return (
    <section className="flex justify-center bg-white dark:bg-gray-900 border-gray-300  items-center min-h-[calc(100vh-150px)]">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {t('Auth.loginTitle')}{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2">
                {t('Auth.emailLabel')}{" "}
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder={t('Auth.emailPlaceholder')}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">
                {t('Auth.passwordLabel')}{" "}
              </Label>
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t('Auth.passwordPlaceholder')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // <-- تبديل حالة الإظهار
                  className="absolute inset-y-0 ltr:right-0 rtl:left-0 px-3 flex items-center text-slate-400 hover:text-slate-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              {t('Auth.loginTitle')}
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-card text-muted-foreground">
                {t('Auth.orContinueWith')}
              </span>
            </div>
          </div>

          <a
            href={`${apiUrl}/api/auth/google`}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium transition-colors border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.846,44,30.138,44,24c0,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            {t('Auth.signInWithGoogle')}
          </a>
        </CardContent>
        <p className="mt-4 text-center text-sm">
          {t('Auth.dontHaveAccount')}{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            {t('Auth.registerHere')}
          </Link>
        </p>
      </Card>
    </section>
  );
}