
import Invoice from "@/db/models/invoice";
import { connectDB } from "@/db/mongodb";
import { NextResponse } from "next/server";

const URL_BASE = `${process.env.SERVER_URL}/api/invoices/`;

export async function GET(request) {
    
  try {
    const { url } = request;

    const invoiceId = url.replace(URL_BASE, "");

    await connectDB();

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice)
      return NextResponse.json(
        { message: `Invoice id ${invoiceId} not found` },
        { status: 404 }
      );

    return NextResponse.json(invoice);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
    
  try {
    const { url } = request;

    const invoiceId = url.replace(URL_BASE, "");

    await connectDB();

    const invoice = await Invoice.deleteOne( { _id: invoiceId} )

    if (!invoice)
      return NextResponse.json(
        { message: `Invoice id ${invoiceId} not found` },
        { status: 404 }
      );

    return NextResponse.json({ status: 204} );
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: error.message }, { status: 400 });
  }
}