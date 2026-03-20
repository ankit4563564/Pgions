import db from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const listings = await db.listing.findMany({
      orderBy: { trustScore: 'desc' }
    });

    const formattedListings = listings.map(l => {
      try {
        return {
          ...l,
          images: typeof l.images === 'string' ? JSON.parse(l.images) : (l.images || []),
          rules: typeof l.rules === 'string' ? JSON.parse(l.rules) : (l.rules || []),
          amenities: typeof l.amenities === 'string' ? JSON.parse(l.amenities) : (l.amenities || []),
          scamFlags: typeof l.scamFlags === 'string' ? JSON.parse(l.scamFlags) : (l.scamFlags || []),
          nearbyPlaces: typeof l.nearbyPlaces === 'string' ? JSON.parse(l.nearbyPlaces) : (l.nearbyPlaces || []),
        };
      } catch (parseError) {
        console.error(`Failed to parse listing ${l.id}:`, parseError);
        return l;
      }
    });

    return NextResponse.json(formattedListings);
  } catch (error) {
    console.error("LISTINGS_GET_ERROR:", error);
    // Return empty array to keep UI components from crashing
    // when the API fails (e.g. missing/invalid DATABASE_URL on Vercel).
    return NextResponse.json([], {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
