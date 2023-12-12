import Luggage from "@/db/models/luggage";
import { connectDB } from "@/db/mongodb";
const { NextResponse } = require("next/server");

export async function GET(request) {
  try {

    const { url } = request;

    const { searchParams } = new URL(url);

    let limit = searchParams.get("limit") || 30;

    await connectDB();

    const luggages = await Luggage.find().limit(limit)

    if (!luggages)
      return NextResponse.json(
        { message: "Luggage not found" },
        { status: 404 }
      );

    return NextResponse.json(luggages);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } 
}
