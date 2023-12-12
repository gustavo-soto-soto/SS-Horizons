
import User from "@/db/models/user";
import { connectDB } from "@/db/mongodb";
import { NextResponse } from "next/server";

const URL_BASE = `${process.env.SERVER_URL}/api/users/`;

export async function GET(request) {
  try {
    const { url } = request;

    const userId = url.replace(URL_BASE, "");

    await connectDB();

    const user = await User.findById(userId).select("+password");

    if (!user)
      return NextResponse.json(
        { message: `User id ${userId} not found` },
        { status: 404 }
      );

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const userId = request.url.replace(URL_BASE, "");
    
    const { firstname, lastname, email, phone,  username, password, role } = await request.json()

    await connectDB();

    const user = await User.findByIdAndUpdate(userId, { firstname, lastname, email, phone, username, password, role } )

    if (!user)
      return NextResponse.json(
        { message: `User id ${userId} not found` },
        { status: 404 }
      );

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
    
  try {
    const { url } = request;

    const userId = url.replace(URL_BASE, "");

    await connectDB();

    const role = await User.deleteOne( { _id: userId} )

    if (!role)
      return NextResponse.json(
        { message: `User id ${userId} not found` },
        { status: 404 }
      );

    return NextResponse.json({ status: 204} );
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: error.message }, { status: 400 });
  }
}