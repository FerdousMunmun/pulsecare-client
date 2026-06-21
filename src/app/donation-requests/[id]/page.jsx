import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DonationDetailsPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signup");
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold">
        Donation Request Details
      </h1>
    </div>
  );
}