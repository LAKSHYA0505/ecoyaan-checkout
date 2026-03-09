"use client";

import CartItem from "./CartItem";
import { useCheckout } from "@/context/CheckoutContext";

interface CartItemType {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  cartItems: CartItemType[];
  shippingFee: number;
  editable?: boolean;
  discount?: number;
}

export default function OrderSummary({
  cartItems: initialCartItems,
  shippingFee: initialShippingFee,
  editable = false,
  discount: initialDiscount = 0,
}: OrderSummaryProps) {
  const {
    cartItems: contextCartItems,
    shippingFee: contextShippingFee,
    discount: contextDiscount,
    updateQuantity,
  } = useCheckout();

  const cartItems =
    contextCartItems && contextCartItems.length > 0
      ? contextCartItems
      : initialCartItems;

  const shippingFee =
    typeof initialShippingFee === "number"
      ? initialShippingFee
      : contextShippingFee;

  const discount =
    typeof contextDiscount === "number" ? contextDiscount : initialDiscount;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + shippingFee - discount;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

      {/* Items */}
      <div>
        {cartItems.map((item) => (
          <CartItem
            key={item.product_id}
            {...item}
            editable={editable}
            {...(editable && {
              onAdd: () => updateQuantity(item.product_id, 1),
              onRemove: () => updateQuantity(item.product_id, -1),
            })}
          />
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          {shippingFee === 0 ? (
            <span className="text-green-600 font-medium">Free Delivery</span>
          ) : (
            <span>₹{shippingFee}</span>
          )}
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Coupon Discount</span>
            <span>− ₹{discount}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-800">
          <span>Grand Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}