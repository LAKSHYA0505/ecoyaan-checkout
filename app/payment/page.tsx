"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import OrderSummary from "@/components/OrderSummary";

const VALID_COUPONS: Record<string, number> = {
  ECO10: 10,
  GREEN50: 50,
  SAVE100: 100,
};

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, shippingFee, shippingAddress, discount, setDiscount } = useCheckout();
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [loading, setLoading] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + shippingFee - discount;

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (appliedCoupon) {
      setCouponMsg({ text: "A coupon is already applied. Remove it first.", success: false });
      return;
    }
    if (VALID_COUPONS[code]) {
      setDiscount(VALID_COUPONS[code]);
      setAppliedCoupon(code);
      setCouponMsg({ text: `✅ "${code}" applied! You saved ₹${VALID_COUPONS[code]}`, success: true });
    } else {
      setCouponMsg({ text: "❌ Invalid coupon code. Try ECO10, GREEN50 or SAVE100", success: false });
    }
  }

  function removeCoupon() {
    setDiscount(0);
    setAppliedCoupon("");
    setCouponInput("");
    setCouponMsg(null);
  }

  function handlePay() {
    setLoading(true);
    setTimeout(() => router.push("/order-success"), 2000);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Left */}
      <div className="space-y-4">

        {/* Address */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-800 mb-3">Delivering to</h2>
          {shippingAddress ? (
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-green-700">{shippingAddress.fullName}</p>
              <p>{shippingAddress.phone}</p>
              <p>{shippingAddress.email}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}</p>
            </div>
          ) : (
            <p className="text-sm text-red-500">No address found. Please go back.</p>
          )}
        </div>

        {/* Coupon */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-800 mb-3">🏷️ Apply Coupon</h2>
          <div className="flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon code"
              disabled={!!appliedCoupon}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-green-600 disabled:bg-gray-50"
            />
            {appliedCoupon ? (
              <button
                onClick={removeCoupon}
                className="px-4 py-2 rounded-lg border-2 border-red-400 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={applyCoupon}
                className="px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors"
              >
                Apply
              </button>
            )}
          </div>
          {couponMsg && (
            <p className={`text-xs mt-2 ${couponMsg.success ? "text-green-600" : "text-red-500"}`}>
              {couponMsg.text}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">Try: ECO10 · GREEN50 · SAVE100</p>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-800 mb-4">Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod("online")}
              className={`border-2 rounded-xl p-3 text-left transition-all ${
                paymentMethod === "online" ? "border-green-600 bg-green-50" : "border-gray-200"
              }`}
            >
              <p className="text-sm font-semibold text-gray-800">💳 Pay Online 🔥</p>
              <p className="text-green-700 font-bold text-sm mt-1">₹{total}</p>
              <p className="text-xs text-green-600">SAVE ₹49</p>
            </button>
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`border-2 rounded-xl p-3 text-left transition-all ${
                paymentMethod === "cod" ? "border-green-600 bg-green-50" : "border-gray-200"
              }`}
            >
              <p className="text-sm font-semibold text-gray-800">💵 Cash on Delivery</p>
              <p className="text-gray-700 font-bold text-sm mt-1">₹{total + 49}</p>
            </button>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? "Processing..." : `Pay Securely ₹${total}`}
        </button>
        <p className="text-center text-xs text-gray-400">
          🔒 100% secure payments • UPI • Cards • NetBanking
        </p>
      </div>

      {/* Right */}
      <div>
        <OrderSummary cartItems={cartItems} shippingFee={shippingFee} discount={discount} />
      </div>

    </div>
  );
}