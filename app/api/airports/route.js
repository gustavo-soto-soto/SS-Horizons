import Airport from "@/db/models/airport";
import { connectDB } from "@/db/mongodb";
const { NextResponse } = require("next/server");

export async function GET(request) {
  try {
    const { url } = request;

    const { searchParams } = new URL(url);

    let query = searchParams.get("query") || null;
    let limit = searchParams.get("limit") || 30;

    let params = {};

    if (query) {
      query = new RegExp(query, "i"); //NO CASE SENSITIVE
      params = {
        $or: [{ country: query }, { city: query }, { airport_name: query }, {IATA_Code: query }, { tags: { $in: [query] } }],
      };
    }

    await connectDB();

    const airports = await Airport.find(params || null).limit(limit);

    if (!airports)
      return NextResponse.json(
        { message: "Airports not found" },
        { status: 404 }
      );

    return NextResponse.json(airports);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } 
}
