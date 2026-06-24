"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/user";

import {
  updateUserRole,
  updateUserStatus,
} from "@/services/user";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-8">
        All Users
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full ${user.status === "blocked"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                      }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">

                    <button
                      onClick={async () => {
                        await updateUserStatus(
                          user._id,
                          "blocked"
                        );

                        window.location.reload();
                      }}
                    >
                      Block
                    </button>
                    <button
                      onClick={async () => {
                        await updateUserStatus(
                          user._id,
                          "active"
                        );

                        window.location.reload();
                      }}
                    >
                      Unblock
                    </button>

                    <button
                      onClick={async () => {
                        await updateUserRole(
                          user._id,
                          "volunteer"
                        );

                        window.location.reload();
                      }}
                    >
                      Make Volunteer
                    </button>

                    <button
                      onClick={async () => {
                        await updateUserRole(
                          user._id,
                          "admin"
                        );

                        window.location.reload();
                      }}
                    >
                      Make Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}