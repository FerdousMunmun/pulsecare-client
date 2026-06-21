import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for being part of PulseCare.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-red-50 p-5 rounded-2xl">
            <p className="text-gray-500 text-sm">
              Email
            </p>

            <h3 className="font-semibold">
              {user?.email}
            </h3>
          </div>

          <div className="bg-red-50 p-5 rounded-2xl">
            <p className="text-gray-500 text-sm">
              Role
            </p>

            <h3 className="font-semibold capitalize">
              {user?.role}
            </h3>
          </div>

          <div className="bg-red-50 p-5 rounded-2xl">
            <p className="text-gray-500 text-sm">
              Status
            </p>

            <h3 className="font-semibold text-green-600">
              {user?.status}
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}