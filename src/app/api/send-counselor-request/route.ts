import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Use a fallback or optional chaining to prevent build errors if the key is missing in the environment
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  console.log("=== API HIT: /api/send-counselor-request ===");
  console.log("API KEY exists:", !!process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    console.log("Request body:", body);
    const { name, email, preferredTime, concern } = body;

    // Validate fields
    if (!name || !email || !preferredTime || !concern) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Simulating successful email send.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Mother Era <support@motherera.com>', 
      to: ['support@motherera.com'],
      subject: 'New Counselor Session Request',
      html: `
        <h2>New Counselor Session Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime}</p>
        <p><strong>Primary Concern:</strong> ${concern}</p>
        <br/>
        <p><em>This request was submitted via the Mother Era platform.</em></p>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending counselor request email:', error);
    return NextResponse.json(
      { error: 'Failed to send request email' },
      { status: 500 }
    );
  }
}
