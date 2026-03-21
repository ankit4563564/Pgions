import { NextResponse } from "next/server";
import { listings } from "@/data/listings";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return new NextResponse("Listing ID required", { status: 400 });
    }

    const listing = listings.find(l => l.id === id);

    if (!listing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("LISTING_ID_GET_ERROR:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
