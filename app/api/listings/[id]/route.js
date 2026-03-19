import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return new NextResponse("Listing ID required", { status: 400 });
    }

    const listing = await db.listing.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { user: true }
        }
      }
    });

    if (!listing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const formattedListing = {
      ...listing,
      images: typeof listing.images === 'string' ? JSON.parse(listing.images) : (listing.images || []),
      rules: typeof listing.rules === 'string' ? JSON.parse(listing.rules) : (listing.rules || []),
      amenities: typeof listing.amenities === 'string' ? JSON.parse(listing.amenities) : (listing.amenities || []),
      scamFlags: typeof listing.scamFlags === 'string' ? JSON.parse(listing.scamFlags) : (listing.scamFlags || []),
      nearbyPlaces: typeof listing.nearbyPlaces === 'string' ? JSON.parse(listing.nearbyPlaces) : (listing.nearbyPlaces || []),
    };

    return NextResponse.json(formattedListing);
  } catch (error) {
    console.error("LISTING_ID_GET_ERROR:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
