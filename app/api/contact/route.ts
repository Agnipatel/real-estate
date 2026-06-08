import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectMongo from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const { name, email, phone, propertyType, budget, message } = await req.json();

    if (!name || !email || !phone || !propertyType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Step 1: Save lead to MongoDB (always runs first)
    await connectMongo();
    await Contact.create({ name, email, phone, propertyType, budget: budget || "", message: message || "" });

    // Step 2: Try sending email notification (non-blocking)
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== "YOUR_GMAIL_APP_PASSWORD_HERE") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"PANDAeCe Leads" <${process.env.EMAIL_USER}>`,
          to: "pandaece72@gmail.com",
          subject: "🏠 New Lead Inquiry - PANDAeCe Real Estate",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; border-radius: 12px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; color: #ffffff;">🏠 New Lead Inquiry</h1>
                <p style="margin: 8px 0 0; color: #bbf7d0; font-size: 15px;">PANDAeCe Real Estate Marketing</p>
              </div>
              <div style="padding: 32px;">
                <p style="color: #94a3b8; margin-bottom: 24px; font-size: 15px;">A new inquiry has been submitted through your website contact form.</p>
                <table style="width: 100%; border-collapse: collapse; border-radius: 10px; overflow: hidden;">
                  <tr>
                    <td style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Full Name</span><br/>
                      <span style="color: #ffffff; font-size: 20px; font-weight: bold; margin-top: 6px; display: block;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Email Address</span><br/>
                      <span style="color: #ffffff; font-size: 20px; font-weight: bold; margin-top: 6px; display: block;">${email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Phone Number</span><br/>
                      <span style="color: #22c55e; font-size: 20px; font-weight: bold; margin-top: 6px; display: block;">${phone}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Property Type</span><br/>
                      <span style="color: #ffffff; font-size: 20px; font-weight: bold; margin-top: 6px; display: block;">${propertyType}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Budget Range</span><br/>
                      <span style="color: #ffffff; font-size: 18px; font-weight: bold; margin-top: 6px; display: block;">${budget || "Not specified"}</span>
                    </td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding: 16px 20px; background: #1e293b;">
                      <span style="color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message</span><br/>
                      <span style="color: #cbd5e1; font-size: 15px; margin-top: 6px; display: block; line-height: 1.6;">${message}</span>
                    </td>
                  </tr>` : ""}
                </table>
                <div style="margin-top: 28px; padding: 18px; background: #166534; border-radius: 10px; border-left: 4px solid #22c55e;">
                  <p style="margin: 0; color: #bbf7d0; font-size: 14px;">⚡ <strong>Action Required:</strong> Follow up with this lead as soon as possible to maximize conversion!</p>
                </div>
                <div style="margin-top: 24px; text-align: center;">
                  <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #16a34a, #15803d); color: #ffffff; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">📞 Call This Lead Now</a>
                </div>
              </div>
              <div style="padding: 20px; text-align: center; border-top: 1px solid #1e293b; background: #0a0f1e;">
                <p style="color: #475569; font-size: 12px; margin: 0;">Sent automatically from PANDAeCe website contact form</p>
                <p style="color: #475569; font-size: 12px; margin: 4px 0 0;">© ${new Date().getFullYear()} PANDAeCe Real Estate Marketing</p>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailError) {
        console.error("Email sending failed (lead still saved to DB):", emailError);
      }
    }

    return NextResponse.json(
      { 
        message: "Inquiry submitted successfully!",
        saved: true,
        emailSent,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to send inquiry: " + message },
      { status: 500 }
    );
  }
}
