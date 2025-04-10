import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import AutoResponseEmail from "../../../emails/AutoResponseEmail";

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
    
    // Render the React Email template for auto-response
    const autoResponseHtml = await render(AutoResponseEmail({ 
      name, 
      message: message.replace(/\n/g, "\n") // Preserve line breaks for the email template
    }));

    // Send auto-response to the sender using your verified domain
    const { data: autoResponseData, error: autoResponseError } = await resend.emails.send({
      from: "Andrew <noreply@hello.0xdrew.com>", // Using your verified domain
      to: [email],
      subject: `Thanks for reaching out, ${name}!`,
      html: autoResponseHtml,
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
