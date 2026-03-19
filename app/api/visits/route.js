import db from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // In a real app we'd enforce session, but for demo we can allow anonymous
    const userId = session?.user?.id; 

    const { listingId, date, timeSlot, phone } = await req.json();

    if (!listingId || !date || !timeSlot || !phone) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Assign to a dummy user if not logged in just for the internship demo flexibility
    let finalUserId = userId;
    if (!finalUserId) {
      const dummyObj = await db.user.findFirst();
      finalUserId = dummyObj?.id;
    }

    const visit = await db.visitRequest.create({
      data: {
        listingId,
        date,
        timeSlot,
        phone,
        userId: finalUserId,
      }
    });

    return NextResponse.json(visit);
  } catch (error) {
    console.error("VISIT_POST_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
