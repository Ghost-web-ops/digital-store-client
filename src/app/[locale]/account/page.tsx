"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from '../../../locales/client';

// تعريف شكل البيانات للطلبات والمنتجات
interface Product {
  id: number;
  name: string;
  file_url: string;
}

interface OrderItem {
  id: number;
  product: Product;
}

interface Order {
  id: number;
  order_date: string;
  total_amount: string;
  orderItems: OrderItem[];
}

export default function AccountPage() {
  const t = useI18n();
  const { token, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const response = await axios.get(`${apiUrl}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn && token) {
      fetchOrders();
    }
  }, [isLoggedIn, token, router, logout]);

  if (isLoading) {
    return <div className="text-center p-10">{t('OrderDetails.loading')}</div>;
  }

  return (
    <main className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">{t('AccountPage.title')}</h1>
      <h2 className="text-2xl font-semibold mb-4">{t('AccountPage.orderHistory')}</h2>

      {orders.length === 0 ? (
        <p>{t('AccountPage.noOrders')}.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{t('OrderDetails.order')}{order.id}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(order.order_date).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">{t('OrderDetails.products')}</p>
                <ul className="space-y-2">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span>{item.product.name}</span>
                      <Button asChild size="sm">
                        <a href={item.product.file_url} target="_blank" rel="noopener noreferrer">
                          {t('OrderDetails.download')}
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
                <p className="text-right mt-4 font-bold">
                  {t('OrderDetails.total')} ${parseFloat(order.total_amount).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}