import Airline from "@/db/models/airline";
import { connectDB } from "@/db/mongodb";
const { NextResponse } = require("next/server");

export async function GET(request) {
  try {
    const { url } = request;

    const { searchParams } = new URL(url);

    let country = searchParams.get("country") || null
    let query = searchParams.get("query") || null;
    let limit = searchParams.get("limit") || 30;

    let params = {};

    if (query) {
      query = new RegExp(query, "i"); //NO CASE SENSITIVE
      params = {
        $or: [{ airline_name: query }, {IATA_Code: query },  {country: query } ],
      };
    }

    if (country) params.country = country

    await connectDB();

    const airlines = await Airline.find(params || null).limit(limit);

    if (!airlines)
      return NextResponse.json(
        { message: "Airlines not found" },
        { status: 404 }
      );

    return NextResponse.json(airlines);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } 
}