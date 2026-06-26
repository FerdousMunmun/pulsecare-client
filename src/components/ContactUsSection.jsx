import {
  Mail,
  Phone,
  MapPin,
  Clock,
  HeartHandshake,
} from "lucide-react";

const ContactUsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-red-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold">
            Contact PulseCare
          </span>

          <h2 className="text-5xl font-bold mt-5">
            We're Here To Help
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg">
            Need help finding a blood donor or have any questions?
            Our support team is always ready to assist you.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <div className="flex items-start gap-5 bg-white shadow-lg rounded-2xl p-6 mb-6 hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <Mail className="text-red-600" size={28} />
              </div>

              <div>
                <h3 className="font-bold text-xl">
                  Email Address
                </h3>

                <p className="text-gray-600 mt-2">
                  support@pulsecare.com
                </p>
              </div>

            </div>

            <div className="flex items-start gap-5 bg-white shadow-lg rounded-2xl p-6 mb-6 hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <Phone className="text-red-600" size={28} />
              </div>

              <div>
                <h3 className="font-bold text-xl">
                  Phone Number
                </h3>

                <p className="text-gray-600 mt-2">
                  +880 1712-345678
                </p>
              </div>

            </div>

            <div className="flex items-start gap-5 bg-white shadow-lg rounded-2xl p-6 mb-6 hover:shadow-xl transition">

              <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <MapPin className="text-red-600" size={28} />
              </div>

              <div>
                <h3 className="font-bold text-xl">
                  Office Address
                </h3>

                <p className="text-gray-600 mt-2">
                  Dhaka, Bangladesh
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="bg-gradient-to-br from-red-600 to-red-500 text-white rounded-3xl p-10 shadow-2xl">

            <HeartHandshake
              size={60}
              className="mb-6"
            />

            <h2 className="text-4xl font-bold mb-5">
              We're Available 24/7
            </h2>

            <p className="text-red-100 leading-8">
              Our dedicated support team is available around the clock to
              help patients, donors and volunteers during emergency blood
              donation situations.
            </p>

            <div className="flex items-center gap-4 mt-8">

              <Clock />

              <span className="text-lg">
                Open 24 Hours • 7 Days a Week
              </span>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">

              <div className="bg-white/10 rounded-2xl p-5 text-center">

                <h3 className="text-3xl font-bold">
                  24/7
                </h3>

                <p className="text-red-100 mt-2">
                  Support
                </p>

              </div>

              <div className="bg-white/10 rounded-2xl p-5 text-center">

                <h3 className="text-3xl font-bold">
                  Fast
                </h3>

                <p className="text-red-100 mt-2">
                  Response
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactUsSection;