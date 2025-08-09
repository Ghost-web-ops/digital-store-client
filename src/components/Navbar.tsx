"use client";
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import  LanguageSwitcher  from "@/components/LanguageSwitcher";
import { useI18n } from '../locales/client';
export default function Navbar() {
const t = useI18n()
  const { isLoggedIn, logout } = useAuth();
  const { items } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo/Brand Name */}
        <Link href="/" className="text-xl font-bold text-primary">
          DigitalStore
        </Link>

        {/* Navigation & Actions */}
        <nav className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-muted rounded-full">
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartItemCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/account" className="p-2 hover:bg-muted rounded-full">
                <User />
              </Link>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
              <LanguageSwitcher />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">{t('nav.login')}</Link>
              </Button>
              <Button asChild>
                <Link href="/register">{t('nav.signUp')}</Link>
              </Button>
              <LanguageSwitcher />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}