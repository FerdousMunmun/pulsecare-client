import { NextResponse } from "next/server";




import { headers } from 'next/headers'
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";



export async function POST(request) {
  try {
    const { amount } = await request.json();

    console.log("Amount:", amount);
    const headersList = await headers()
    const origin = headersList.get('origin')
    const userSession = await auth.api.getSession({
      headers: await headers()
    })

    const user = userSession?.user
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: { currency: "usd", product_data: { name: "PulseCare Donation", }, unit_amount: Number(amount) * 100, },
          quantity: 1,
        },
      ],

      metadata: {
        amount, userId: user.id, userName: user.name, userEmail: user.email,
      },
      mode: "payment",
      success_url: `${origin}/funding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:
        `${origin}/funding/cancel`,
    });
    return NextResponse.json({ url: session.url, });
  } catch (err) 
   
  {console.log(err);
    return NextResponse.json({ error: err.message }, 
      { status: err.statusCode || 500 });
  }
}






export async function GET() {
  return NextResponse.json({ message: "hello from subscription api route" })
}