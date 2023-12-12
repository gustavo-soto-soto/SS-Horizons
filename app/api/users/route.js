import User from "@/db/models/user";
import { connectDB } from "@/db/mongodb";
import bcrypt from 'bcryptjs';
const { NextResponse } = require("next/server");

export async function GET (request) {
    try {

        await connectDB()

        const users = await User.find()
        
        if (!users) return NextResponse.json({message: "Users not found"}, {status: 404} )

        return NextResponse.json(users)

    } catch (error) {
        console.error(error)
        return NextResponse.json( { message: error.message }, { status: 500 } )
    }
}

export async function POST ( request ) {

    try {

        const { firstname, lastname, email, phone,  username, password, role } = await request.json()

        await connectDB()
        
        const userExists = await User.findOne( { username } )

        if (userExists) throw new Error("El nombre de usuario o correo ya existen")

        const hashedPassword = await bcrypt.hash(password, 12)
        
        const user = new User( { firstname, lastname, email, phone,  username, password: hashedPassword, role } )

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