import Invoice from "@/db/models/invoice";
import { connectDB } from "@/db/mongodb";
import { NextResponse } from "next/server";

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
        $or: [{ user_id: query }],
      };
    }

    await connectDB();

    const invoices = await Invoice.find(params || null).sort({_id: -1}).limit(limit);

    if (!invoices)
      return NextResponse.json(
        { message: "Invoices not found" },
        { status: 404 }
      );

    return NextResponse.json(invoices);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } 
}


export async function POST(request) {
  try {
    const payload = await request.json();

    await connectDB();

    const invoice = new Invoice({ ...payload });

    const savedInvoice = await invoice.save();

    return NextResponse.json({
      _id: savedInvoice._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
