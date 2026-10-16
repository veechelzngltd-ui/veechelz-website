import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml, fromAddress } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;
    const interest = body.interest || body.notes || '';

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone/WhatsApp number are required' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      );
    }
    if (!process.env.CONTACT_RECEIVER_EMAIL) {
      return NextResponse.json(
        { error: 'Contact receiver email not configured' },
        { status: 500 }
      );
    }

    // Log the lead server-side as well, so the request is captured even if the
    // downstream email provider has an issue.
    console.log('[brochure-lead]', { name, email, phone, interest, timestamp: new Date().toISOString() });

    // Send email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: fromAddress('Veechelz Leads'),
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Brochure/Spec Sheet Request: ${name}`,
      html: `
        <h2>New Brochure / Technical Spec Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone/WhatsApp:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Product Interest:</strong></p>
        <p>${escapeHtml(String(interest).trim() || 'Not specified')}</p>
        <hr>
        <p><em>This email was sent from the Veechelz website brochure request form.</em></p>
      `,
    });

    if (error) {
      // Don't block the download on email delivery issues — the lead is already
      // logged above. Surface the error so the client can decide how to proceed.
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Brochure API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
