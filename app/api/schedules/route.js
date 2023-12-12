import Schedule from "@/db/models/schedule";
import { connectDB } from "@/db/mongodb";
const { NextResponse } = require("next/server");

export async function GET(request) {
  try {

    const { url } = request;

    const { searchParams } = new URL(url);

    let limit = searchParams.get("limit") || 30;

    await connectDB();

    const schedules = await Schedule.find().limit(limit)

    if (!schedules)
      return NextResponse.json(
        { message: "Schedules not found" },
        { status: 404 }
      );

    return NextResponse.json(schedules);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } 
}
