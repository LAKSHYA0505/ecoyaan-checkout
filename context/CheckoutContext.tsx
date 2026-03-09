"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

interface CheckoutContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  updateQuantity: (product_id: number, delta: number) => void;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
  shippingFee: number;
  discount: number;
  setDiscount: (amount: number) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [discount, setDiscount] = useState(0);
  const shippingFee = 50;

  function updateQuantity(product_id: number, delta: number) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product_id === product_id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        setCartItems,
        updateQuantity,
        shippingAddress,
        setShippingAddress,
        shippingFee,
        discount,
        setDiscount,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
}