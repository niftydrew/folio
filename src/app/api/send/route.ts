import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send notification to site owner
    const { data: notificationData, error: notificationError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Default from address
      to: ["andrewakyampong@gmail.com"], // Your email
      subject: `New Portfolio Contact: ${name}`,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div>
            <strong>Message:</strong>
            <p>${message.replace(/\n/g, "<br />")}</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (notificationError) {
      console.error("Notification email sending failed:", notificationError);
      return NextResponse.json(
        { error: "Failed to send email notification" },
        { status: 500 }
      );
    }
    
    // Send auto-response to the sender using your verified domain
    const { data: autoResponseData, error: autoResponseError } = await resend.emails.send({
      from: "Andrew <noreply@hello.0xdrew.com>", // Using your verified domain
      to: [email],
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Your Message</h2>
          <p>Hi ${name},</p>
          <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #333;">
            <p style="margin: 0; font-style: italic;">${message.replace(/\n/g, "<br />")}</p>
          </div>
          
          <p>In the meantime, feel free to connect with me on social media or check out more of my work:</p>
          <ul>
            <li><a href="https://github.com/andrewakyampong" style="color: #0366d6;">GitHub</a></li>
            <li><a href="https://twitter.com/0xcoderdrew" style="color: #1DA1F2;">Twitter</a></li>
          </ul>
          
          <p>Best regards,<br>Andrew Akyampong</p>
        </div>
      `,
      replyTo: "andrewakyampong@gmail.com",
    });

    if (autoResponseError) {
      console.error("Auto-response email sending failed:", autoResponseError);
      // Don't return error here, we've already sent the notification email successfully
      // Just log the error and continue
    }

    return NextResponse.json(
      { 
        success: true, 
        notification: notificationData,
        autoResponse: autoResponseData || null
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
