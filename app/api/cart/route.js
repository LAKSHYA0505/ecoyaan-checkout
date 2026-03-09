import { NextResponse } from "next/server";
import { cartData } from "@/lib/cartData";

export async function GET() {
  return NextResponse.json(cartData);
}