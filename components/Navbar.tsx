"use client";

import Link from "next/link";
import { useCheckout } from "@/context/CheckoutContext";

export default function Navbar() {
  const { shippingAddress } = useCheckout();

  const locationLabel = shippingAddress
    ? `${shippingAddress.city}, ${shippingAddress.pinCode}`
    : "Set delivery location";

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      
      {/* Top Row */}
      <div className="flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/ecoyaan-favicon.ico"
            alt="Ecoyaan logo"
            className="w-8 h-8 rounded-md"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-green-700">Ecoyaan</span>
            <span className="text-xs text-gray-500">Sustainability made easy</span>
          </div>
        </Link>

        {/* Location — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-600 shrink-0">
          <span>📍</span>
          <span>{locationLabel}</span>
        </div>

        {/* Search — full width on desktop */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-full px-4 py-2 flex-1 max-w-md">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search for 'Coir Brushes'"
            className="outline-none text-sm w-full text-gray-600 bg-transparent"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="text-gray-600 hover:text-green-700">👤</button>
          <button className="text-gray-600 hover:text-green-700">🤍</button>
          <Link href="/" className="text-gray-600 hover:text-green-700">🛒</Link>
        </div>

      </div>

      {/* Mobile Search Row */}
      <div className="flex md:hidden items-center border border-gray-300 rounded-full px-4 py-2 mt-2">
        <span className="text-gray-400 mr-2">🔍</span>
        <input
          type="text"
          placeholder="Search for 'Coir Brushes'"
          className="outline-none text-sm w-full text-gray-600 bg-transparent"
        />
      </div>

    </nav>
  );
}