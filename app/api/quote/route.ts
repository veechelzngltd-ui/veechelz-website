import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { customerEmailShell, escapeHtml, fromAddress, isValidEmail } from '@/lib/email';

interface QuoteRequestItem {
  title: string;
  finish?: string;
  quantity: number;
  specifications?: string[];
}

function buildItemsTable(items: QuoteRequestItem[]): string {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px 14px; border: 1px solid #E7E5E4; font-family: Georgia, serif;">${escapeHtml(item.title)}</td>
          <td style="padding: 10px 14px; border: 1px solid #E7E5E4;">${escapeHtml(item.finish || 'Not specified')}</td>
          <td style="padding: 10px 14px; border: 1px solid #E7E5E4; text-align: center;">${escapeHtml(String(item.quantity))}</td>
          <td style="padding: 10px 14px; border: 1px solid #E7E5E4;">${
            item.specifications && item.specifications.length > 0
              ? escapeHtml(item.specifications.join(', '))
              : '—'
          }</td>
        </tr>`
    )
    .join('');

  return `
    <table style="border-collapse: collapse; width: 100%; margin-top: 8px; font-size: 14px; color: #292524;">
      <thead>
        <tr style="background-color: #F5F5F4;">
          <th style="padding: 10px 14px; border: 1px solid #E7E5E4; text-align: left;">Title</th>
          <th style="padding: 10px 14px; border: 1px solid #E7E5E4; text-align: left;">Finish / Color</th>
          <th style="padding: 10px 14px; border: 1px solid #E7E5E4; text-align: center;">Qty</th>
          <th style="padding: 10px 14px; border: 1px solid #E7E5E4; text-align: left;">Specifications</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, city, items } = body as {
      name?: string;
      email?: string;
      phone?: string;
      city?: string;
      items?: QuoteRequestItem[];
    };

    // Validate required fields
    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { error: 'Name, email, phone, and city are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one item is required for a quote request' },
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

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: fromAddress('Veechelz Leads'),
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Quote Request: ${name} (${city})`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #292524;">
          <h2 style="font-family: Georgia, serif; color: #1C1917;">New Quote Request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Delivery / Installation City:</strong> ${escapeHtml(city)}</p>
          <h3 style="font-family: Georgia, serif; color: #1C1917; margin-top: 24px;">Requested Items</h3>
          ${buildItemsTable(items)}
          <p style="margin-top: 24px; font-size: 13px; color: #78716C;">
            Final pricing to be determined by dimensions, fabric grade, and site survey. Verify material availability before responding with a quote.
          </p>
          <hr style="border: none; border-top: 1px solid #E7E5E4; margin: 24px 0;" />
          <p style="font-size: 12px; color: #A8A29E;"><em>This email was sent from the Veechelz website quote request flow.</em></p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Customer confirmation. Non-fatal: the lead email above is what matters, so a failure
    // here (e.g. sender domain not verified yet) is logged but never fails the request.
    try {
      const confirmation = await resend.emails.send({
        from: fromAddress('Veechelz Nigeria Limited'),
        to: email.trim(),
        replyTo: process.env.CONTACT_RECEIVER_EMAIL,
        subject: 'We have received your quote request — Veechelz',
        html: customerEmailShell({
          heading: 'Quote request received',
          greetingName: name,
          intro:
            'Thank you for choosing Veechelz. We have received your request and our team will verify material availability and follow up via email or phone with full pricing shortly.',
          bodyHtml: `
            <p style="margin:0 0 4px; font-size:13px; letter-spacing:1px; color:#78716C; text-transform:uppercase;">Your request</p>
            ${buildItemsTable(items)}
            <p style="margin:12px 0 0; font-size:13px; color:#78716C;">
              Delivery / installation city: ${escapeHtml(city)}
            </p>`,
          closing:
            'Final pricing is determined by dimensions, fabric grade, and a site survey, so we will confirm the details with you before anything is fabricated.',
        }),
      });
      if (confirmation.error) {
        console.error('Quote confirmation email failed:', confirmation.error.message);
      }
    } catch (confirmationError) {
      console.error('Quote confirmation email error:', confirmationError);
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
