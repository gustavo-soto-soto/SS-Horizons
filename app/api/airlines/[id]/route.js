import Airline from "@/db/models/airline";
import { connectDB } from "@/db/mongodb";
import { NextResponse } from "next/server";

const URL_BASE = `${process.env.SERVER_URL}/api/airlines/`;

export async function GET(request) {
  try {
    const { url } = request;

    const airlineId = url.replace(URL_BASE, "");

    await connectDB();

    const airline = await Airline.findById(airlineId);

    if (!airline)
      return NextResponse.json(
        { message: `Airline id ${airlineId} not found` },
        { status: 404 }
      );

    return NextResponse.json(airport);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: error.message }, { status: 400 });
  }
}
