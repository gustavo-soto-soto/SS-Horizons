import { connectDB, getModelNames } from "@/db/mongodb";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await connectDB()
        const collections = await getModelNames()
        return NextResponse.json( { model_names: collections })
    } catch (error) {
        return NextResponse.json({"error": error.message})
    }
}