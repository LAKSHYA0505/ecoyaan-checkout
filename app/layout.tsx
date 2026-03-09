import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CheckoutProvider } from "@/context/CheckoutContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Sustainable shopping checkout flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <CheckoutProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-8">
            {children}
          </main>
        </CheckoutProvider>
      </body>
    </html>
  );
}