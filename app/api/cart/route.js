import { NextResponse } from "next/server";

const cartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTjuVPZrbBzf7EqqL79xqE0N69f8ZKsNgDUbR0qQfqlIDn_k2BjXUqjXhY2RYJGr7cTfUndTxWuxgxI2cEpMjEAbTvY0fxz",
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: "https://prod-cdn.ecoyaan.com/cdn/seller-docs/35/product/1299/images/pi/1299-804ec981-1743573033.jpg",
    },
  ],
  shipping_fee: 50,
  discount_applied: 0,
};

export async function GET() {
  return NextResponse.json(cartData);
}