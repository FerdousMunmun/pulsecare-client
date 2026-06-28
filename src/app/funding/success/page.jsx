

import { stripe } from '@/lib/stripe'
import { subscription } from '@/services/funding'
import { redirect } from 'next/navigation'



export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
await subscription({...metadata,sessionId:session_id});
 

    return (
      <section id="success">
         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10">

      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center mt-6 text-gray-800">
        Payment Successful!
      </h1>

      <p className="text-center text-gray-600 mt-4 text-lg">
        Thank you for supporting PulseCare.
      </p>

      <p className="text-center text-gray-600 mt-2">
        A confirmation email has been sent to
      </p>

      <p className="text-center text-green-600 font-semibold text-xl mt-1">
        {customerEmail}
      </p>

      <div className="grid md:grid-cols-2 gap-5 mt-10">

        <div className="border rounded-2xl p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">
            Need Help?
          </h3>

          <p className="text-gray-600">
            If you have any questions regarding your donation,
            feel free to contact us.
          </p>
        </div>

        <div className="border rounded-2xl p-6 bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">
            Contact
          </h3>

          <p className="text-red-600 font-medium">
            orders@example.com
          </p>

          <p className="text-gray-500 mt-2">
            Available 24/7 for support.
          </p>
        </div>

      </div>

      <div className="flex justify-center mt-10">
        <a
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Back to Home
        </a>
      </div>

    </div>
  </div>
      </section>
    )
  }
}

