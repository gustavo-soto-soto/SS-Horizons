const { NextResponse } = require("next/server");
import nodemailer from 'nodemailer';

export async function POST(request) {

    try {
        const { to, subject, html } = await request.json();
        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
        });

        const email = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        const response = await transporter.sendMail(email);

        return NextResponse.json( { ...response } )

    } catch (error) {
        console.error(error)
        return NextResponse.json( { error: error.message } )
    }
    
}
