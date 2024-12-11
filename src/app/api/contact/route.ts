import { NextRequest, NextResponse } from "next/server"
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    const { name, email, subject, message } = await request.json()
    console.log(name, email, message)

    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com", 
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER, 
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"Portfolio Website" <${subject}>`, 
        to: 'ssjksreejith@gmail.com',
        subject: subject,
        text: `There is a new contact form message: ${message}`,
    });

    return NextResponse.json({ message: 'Message sent successfully' })
}