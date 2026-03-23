import { NextResponse } from 'next/server';

// Simple email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    // Sanitize
    const sanitizedEmail = email.trim().toLowerCase();

    // TODO: Integrate with your email provider (Resend, Mailchimp, ConvertKit, etc.)
    // Example with Resend:
    // await resend.contacts.create({ email: sanitizedEmail, audienceId: AUDIENCE_ID });
    //
    // For now, log and return success
    console.log('[Newsletter] New subscriber:', sanitizedEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Newsletter] Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
