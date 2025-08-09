"use client";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <div className="flex gap-2">
      <Button 
        variant={locale === 'en' ? 'secondary' : 'ghost'} 
        size="sm" 
        onClick={() => changeLocale('en')}
      >
        EN
      </Button>
      <Button 
        variant={locale === 'ar' ? 'secondary' : 'ghost'} 
        size="sm" 
        onClick={() => changeLocale('ar')}
      >
        AR
      </Button>
    </div>
  );
}