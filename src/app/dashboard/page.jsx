export default function DashboardHome({ user }) {
  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold text-red-600">
        Welcome {user?.name} 👋
      </h1>

      <p className="text-gray-600 mt-2">
        You are logged in as <span className="font-bold capitalize">{user?.role}</span>
      </p>

    </div>
  );
}