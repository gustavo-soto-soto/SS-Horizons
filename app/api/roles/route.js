import Role from "@/db/models/role";
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
      params = { role_name: query };
    }

    await connectDB();

    const roles = await Role.find(params || null).limit(limit);

    if (!roles)
      return NextResponse.json({ message: "Roles not found" }, { status: 404 });

    return NextResponse.json(roles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { role_name, description, permissions } = await request.json();

    await connectDB();

    const roleExists = await Role.findOne({ role_name });

    if (roleExists) throw new Error("Role already exists");

    const role = new Role({ role_name, description, permissions });

    const savedRole = await role.save();

    return NextResponse.json({
      _id: savedRole._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
