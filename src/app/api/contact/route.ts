import { NextRequest, NextResponse } from "next/server"
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
        return NextResponse.json(
            { error: 'All fields are required' },
            { status: 400 }
        )
    }

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
        from: `"Portfolio Website" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: 'buildwithsreejith@gmail.com',
        subject: subject,
        text: `New contact from ${name} (${email}):\n\n${message}`,
    });

    return NextResponse.json({ message: 'Message sent successfully' })
}
