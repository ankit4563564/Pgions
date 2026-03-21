import { NextResponse } from "next/server";
import { listings } from "@/data/listings";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // Sort listings by trust score (highest first)
    const sortedListings = [...listings].sort((a, b) => b.trustScore - a.trustScore);
    
    return NextResponse.json(sortedListings);
  } catch (error) {
    console.error("LISTINGS_GET_ERROR:", error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to fetch listings',
        listings: [],
      },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
