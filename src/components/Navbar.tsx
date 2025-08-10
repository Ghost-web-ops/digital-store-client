"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "../locales/client";
export default function Navbar() {
  const t = useI18n();
  const { isLoggedIn, logout } = useAuth();
  const { items } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo/Brand Name */}
        <Link href="/" className="text-xl font-bold text-primary">
          DigitalStore
        </Link>

        {/* --- Desktop Navigation (Hidden on Mobile) --- */}
        <nav className="hidden md:flex items-center gap-4">
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
              <Link href="/account" className="p-2 hover:bg-muted rounded-full"><User /></Link>
              <Button variant="ghost" size="icon" onClick={logout}><LogOut className="h-5 w-5" /></Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild><Link href="/login">{t('nav.login')}</Link></Button>
              <Button asChild><Link href="/register">{t('nav.signUp')}</Link></Button>
            </div>
          )}
          <LanguageSwitcher />
        </nav>

        {/* --- Mobile Menu Button (Visible on Mobile) --- */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background md:hidden z-20 border-b">
          <nav className="flex flex-col items-center p-4 space-y-4">
            {isLoggedIn ? (
              <>
                <Link href="/account" className="w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>{t('nav.myAccount')}</Link>
                <Link href="/cart" className="w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>{t('nav.cart')} ({cartItemCount})</Link>
                <Button variant="destructive" onClick={logout} className="w-full">{t('nav.logout')}</Button>
              </>
            ) : (
              <>
                <Link href="/cart" className="w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>{t('nav.cart')} ({cartItemCount})</Link>
                <Link href="/login" className="w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>{t('nav.login')}</Link>
                <Button asChild className="w-full"><Link href="/register" onClick={() => setIsMenuOpen(false)}>{t('nav.signUp')}</Link></Button>
              </>
            )}
            <div className="pt-4 border-t w-full flex justify-center">
                <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
