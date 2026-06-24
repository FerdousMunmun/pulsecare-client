
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role?.toLowerCase();

if (role === "admin") {
  redirect("/dashboard/admin");
}

if (role === "volunteer") {
  redirect("/dashboard/volunteer");
}

redirect("/dashboard/donor");;
}