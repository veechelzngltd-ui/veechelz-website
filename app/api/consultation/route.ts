import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { customerEmailShell, escapeHtml, fromAddress, isValidEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;
    const projectDetails: string = String(
      body.projectDetails || body.details || body.message || body.notes || ''
    );

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
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

    const detailsText = projectDetails.trim()
      ? projectDetails
      : 'No additional details provided';

    // Send the lead notification to the business
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: fromAddress('Veechelz Leads'),
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Consultation Request: ${name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Project Details:</strong></p>
        <p>${escapeHtml(detailsText).replace(/\n/g, '<br />')}</p>
        <hr>
        <p><em>This email was sent from the Veechelz website consultation form.</em></p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Customer confirmation. Non-fatal: a failure here (e.g. sender domain not verified yet)
    // is logged but never fails the request, since the lead email above already went through.
    try {
      const confirmation = await resend.emails.send({
        from: fromAddress('Veechelz Nigeria Limited'),
        to: email.trim(),
        replyTo: process.env.CONTACT_RECEIVER_EMAIL,
        subject: 'We have received your request — Veechelz',
        html: customerEmailShell({
          heading: 'Request received',
          greetingName: name,
          intro:
            'Thank you for reaching out to Veechelz. We have received your consultation request and a member of our technical team will get back to you shortly.',
          bodyHtml: projectDetails.trim()
            ? `
            <p style="margin:0 0 4px; font-size:13px; letter-spacing:1px; color:#78716C; text-transform:uppercase;">What you told us</p>
            <p style="margin:0; padding:12px 16px; background:#F5F5F4; border-left:3px solid #B38F5B; font-size:14px; line-height:1.6;">${escapeHtml(projectDetails).replace(/\n/g, '<br />')}</p>`
            : '',
          closing:
            'If you booked a site survey, we will confirm the date and time with you directly.',
        }),
      });
      if (confirmation.error) {
        console.error('Consultation confirmation email failed:', confirmation.error.message);
      }
    } catch (confirmationError) {
      console.error('Consultation confirmation email error:', confirmationError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
