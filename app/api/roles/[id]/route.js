
import Role from "@/db/models/role";
import { connectDB } from "@/db/mongodb";
import { NextResponse } from "next/server";

const URL_BASE = `${process.env.SERVER_URL}/api/roles/`;

export async function DELETE(request) {
    
    try {
      const { url } = request;
  
      const roleId = url.replace(URL_BASE, "");
  
      await connectDB();
  
      const role = await Role.deleteOne( { _id: roleId} )
  
      if (!role)
        return NextResponse.json(
          { message: `Role id ${roleId} not found` },
          { status: 404 }
        );
  
      return NextResponse.json({ status: 204} );
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: error.message }, { status: 400 });
    }
}