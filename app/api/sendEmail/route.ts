// app/api/sendEmail/route.ts
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, contactNo, semester, group, subject, resourceType, note, downloadURL } = await request.json();

  // Configure your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or application-specific password
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
        error: (error as Error).message, // Type assertion to Error
    });
}
