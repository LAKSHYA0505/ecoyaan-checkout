"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import Link from "next/link";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { shippingAddress } = useCheckout();
  const [orderNumber] = useState(
    `ECO-${Math.floor(Math.random() * 90000) + 10000}`
  );
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  function handleCancel() {
    setCancelling(true);
    setTimeout(() => {
      setCancelling(false);
      setCancelled(true);
    }, 1500);
  }

  if (cancelled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Order Cancelled</h1>
        <p className="text-gray-500 text-sm mb-6">
          Your order <span className="font-semibold">{orderNumber}</span> has been cancelled successfully.
        </p>
        <Link
          href="/"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">

      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">✅</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-500 text-sm mb-1">
        Thank you for shopping sustainably 🌱
      </p>
      <p className="text-gray-400 text-xs mb-6">
        Order ID: <span className="font-semibold text-gray-600">{orderNumber}</span>
      </p>

      {/* Address Confirmation */}
      {shippingAddress && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 mb-6 w-full max-w-sm text-left">
          <p className="font-semibold text-gray-800 mb-1">Delivering to:</p>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}</p>
          <p>{shippingAddress.phone}</p>
        </div>
      )}

      {/* Cancel Order Button */}
      <button
        onClick={handleCancel}
        disabled={cancelling}
        className="mb-3 w-full max-w-sm border-2 border-red-400 text-red-500 hover:bg-red-50 disabled:opacity-50 font-semibold py-3 rounded-lg transition-colors"
      >
        {cancelling ? "Cancelling..." : "Cancel Order"}
      </button>

      {/* Continue Shopping */}
      <Link
        href="/"
        className="w-full max-w-sm bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-colors text-center block"
      >
        Continue Shopping
      </Link>

    </div>
  );
}