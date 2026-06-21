import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        My Profile
      </h1>

      <p>Name: {session?.user?.name}</p>

      <p>Email: {session?.user?.email}</p>

      <p>Role: {session?.user?.role}</p>

    </div>
  );
}