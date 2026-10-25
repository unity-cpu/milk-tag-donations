import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PACKAGES, PackageId } from "@/lib/packages";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageId, username } = body as {
      packageId: PackageId;
      username: string;
    };

    if (!packageId || !PACKAGES[packageId]) {
      return NextResponse.json(
        { error: "Invalid package" },
        { status: 400 }
      );
    }

    if (!username || typeof username !== "string" || username.trim().length < 2) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const pkg = PACKAGES[packageId];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"], // Cash App Pay is auto-enabled if turned on in Dashboard
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        packageId: pkg.id,
        username: username.trim(),
        packageName: pkg.name,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
