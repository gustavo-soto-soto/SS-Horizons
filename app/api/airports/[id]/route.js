import Airport from "@/db/models/airport";
import { connectDB } from "@/db/mongodb";
import { NextResponse } from "next/server";

const URL_BASE = `${process.env.SERVER_URL}/api/airports/`;

export async function GET(request) {
  try {
    const { url } = request;

    const airportId = url.replace(URL_BASE, "");

    await connectDB();

    const airport = await Airport.findById(airportId);

    if (!airport)
      return NextResponse.json(
        { message: `Airport id ${airportId} not found` },
        { status: 404 }
      );

    return NextResponse.json(airport);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: error.message }, { status: 400 });
  }
}
