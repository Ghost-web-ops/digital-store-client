"use client"; // <-- الخطوة 1: تحويله لمكون عميل

import { useState, useEffect } from "react"; // <-- استدعاء Hooks جديدة
import axios from "axios";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store"; // <-- الخطوة 2: استدعاء "دماغ" السلة
import toast from "react-hot-toast"; // (اختياري: لإظهار إشعارات جميلة)
import { useI18n } from "../../locales/client"; // <-- استدعاء الترجمة
// تعريف شكل بيانات المنتج
interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
}

export default function HomePage() {
  const t = useI18n(); // <-- استخدام الترجمة
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCartStore(); // <-- الوصول لدالة الإضافة للسلة

  useEffect(() => {
    // دالة لجلب المنتجات من الـ API الخاص بنا
    async function getProducts() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await axios.get(`${apiUrl}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    getProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center"> {t('HomePage.title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              {product.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              )}
              <CardTitle className="pt-4">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">
                {product.description || "No description available."}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              {/* الخطوة 3: ربط الزر بالدالة */}
              <Button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
