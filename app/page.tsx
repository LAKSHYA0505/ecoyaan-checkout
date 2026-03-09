import { cartData } from "@/lib/cartData";
import { CheckoutInitializer } from "@/components/CheckoutInitializer";
import OrderSummary from "@/components/OrderSummary";
import Link from "next/link";

export default async function CartPage() {
  const data = cartData; // ← direct import, no HTTP fetch needed

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <CheckoutInitializer cartItems={data.cartItems} />

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

      <OrderSummary
        cartItems={data.cartItems}
        shippingFee={data.shipping_fee}
        editable={true}
      />

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