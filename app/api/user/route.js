import User from "@/db/models/user";
import { connectDB } from "@/db/mongodb";
import bcrypt from 'bcryptjs';
const { NextResponse } = require("next/server");

export async function GET (request) {
    try {
        const { url } = request

        const { searchParams } = new URL(url)

        const userId = searchParams.get("userId")

        await connectDB()

        const user = await User.findById(userId)
        
        if (!user) return NextResponse.json({message: "User not found"}, {status: 404} )

        return NextResponse.json(user)

    } catch (error) {
        console.error(error)
        return NextResponse.json( { message: error.message }, { status: 500 } )
    }
}

export async function POST ( request ) {

    try {

        const { firstname, lastname, email, phone,  username, password } = await request.json()

        await connectDB()
        
        const userExists = await User.findOne( { username } )

        if (userExists) throw new Error("User already exists")

        const hashedPassword = await bcrypt.hash(password, 12)
        
        const user = new User( { firstname, lastname, email, phone,  username, password: hashedPassword } )

        const savedUser = await user.save()

        return NextResponse.json({
            _id: savedUser._id,
            username: savedUser.email,
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json( { message: error.message }, { status: 400 } )
    }

}