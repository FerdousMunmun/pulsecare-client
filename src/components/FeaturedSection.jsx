import {
  Search,
  ShieldCheck,
  Ambulance,
  ArrowRight,
  UserPlus,
  HeartHandshake,
  Droplets,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Instant Donor Search",
    description:
      "Find verified blood donors quickly by blood group, district and upazila whenever you need emergency support.",
    color: "text-red-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified Donors",
    description:
      "All donor profiles are verified to build trust and ensure safe blood donation for every patient.",
    color: "text-green-600",
  },
  {
    icon: Ambulance,
    title: "Emergency Support",
    description:
      "Connect patients with nearby donors instantly and help save lives during critical emergencies.",
    color: "text-blue-600",
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Register as a donor or recipient in just a few simple steps.",
  },
  {
    icon: Search,
    title: "Search Donor",
    description:
      "Search verified donors using blood group, district and upazila.",
  },
  {
    icon: HeartHandshake,
    title: "Donate & Save Lives",
    description:
      "Connect with donors and complete successful blood donations.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold">
            Why PulseCare?
          </span>

          <h2 className="text-5xl font-bold mt-5">
            Why Choose PulseCare?
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
            PulseCare provides a fast, secure and reliable platform that
            connects blood donors with recipients to save lives during
            emergencies.
          </p>
        </div>

        {/* Feature Cards */}

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center ${item.color}`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="text-2xl font-bold mt-7 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-red-600 font-semibold mt-8 group-hover:gap-4 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* How It Works */}

        <div className="mt-28">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              How PulseCare Works
            </h2>

            <p className="text-gray-600 mt-4">
              Three simple steps to connect donors and save lives.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <Icon
                      size={40}
                      className="text-red-600"
                    />
                  </div>

                  <span className="inline-block bg-red-600 text-white rounded-full px-4 py-1 text-sm mb-4">
                    Step {index + 1}
                  </span>

                  <h3 className="text-2xl font-bold mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}

        <div className="mt-24 bg-gradient-to-r from-red-600 to-red-500 rounded-3xl text-white text-center py-16 px-8">
          <Droplets
            size={50}
            className="mx-auto mb-5"
          />

          <h2 className="text-4xl font-bold">
            Be a Hero. Donate Blood Today.
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-red-100">
            Every donation can save up to three lives. Join our community
            of life-saving heroes and make a difference today.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

  <span className="bg-white/20 px-6 py-3 rounded-full">
    ❤️ Save Lives
  </span>

  <span className="bg-white/20 px-6 py-3 rounded-full">
    🩸 Donate Blood
  </span>

  <span className="bg-white/20 px-6 py-3 rounded-full">
    👨‍⚕️ Verified Community
  </span>

</div>
        </div>
      </div>
    </section>
  );
}