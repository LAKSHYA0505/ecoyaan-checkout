"use client";

import { useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export function CheckoutInitializer({ cartItems }: { cartItems: CartItem[] }) {
  const { setCartItems } = useCheckout();

  useEffect(() => {
    setCartItems(cartItems);
  }, []);

  return null;
}