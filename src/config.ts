// src/config.ts

// 1. نجعل المصفوفة حرفية عبر "as const"
export const locales = ['en', 'ar'] as const;

// 2. نشتقّ نوع الاتحاد مباشرةً من المصفوفة
export type Locale = (typeof locales)[number];

// 3. نحدّد defaultLocale كقيمة حرفية من الاتحاد
export const defaultLocale: Locale = 'en';
