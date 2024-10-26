
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, email, contactNo, semester, group, subject, resourceType, note, downloadURL } = await request.json();

    
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'kurosen930@gmail.com',
        subject: 'Archivos - New Resource Uploaded',
        text: `
            Name: ${name}
            Email: ${email}
            Contact No: ${contactNo}
            Semester: ${semester}
            Group: ${group}
            Subject: ${subject}
            Resource Type: ${resourceType}
            Note: ${note}
            Download URL: ${downloadURL}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message, 
        });
    } 
} 
