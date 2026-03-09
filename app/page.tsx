import { CheckoutInitializer } from "@/components/CheckoutInitializer";
import OrderSummary from "@/components/OrderSummary";
import Link from "next/link";

async function getCartData() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/cart`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function CartPage() {
  const data = await getCartData();

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {/* Initializes context with server-fetched data */}
      <CheckoutInitializer cartItems={data.cartItems} />

      {/* Savings Banner */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3 mb-6">
        <span className="text-green-600 text-xl">✦</span>
        <div>
          <p className="text-green-700 font-semibold text-sm">
            You are making a sustainable choice!
          </p>
          <p className="text-green-600 text-xs">
            Great choice! You're making sustainable shopping more rewarding.
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <OrderSummary
        cartItems={data.cartItems}
        shippingFee={data.shipping_fee}
        editable={true}
      />

      {/* Proceed Button */}
      <div className="flex justify-end mt-6">
        <Link
          href="/shipping"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}