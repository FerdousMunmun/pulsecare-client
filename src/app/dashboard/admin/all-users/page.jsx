


"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "@/services/user";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const usersPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleStatusChange = async (id, status) => {
    await updateUserStatus(id, status);

    setUsers((prev) =>
      prev.map((user) =>
        user._id === id
          ? { ...user, status }
          : user
      )
    );
  };

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);

    setUsers((prev) =>
      prev.map((user) =>
        user._id === id
          ? { ...user, role }
          : user
      )
    );
  };

  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(
    users.length / usersPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-red-600 mb-8">
        All Users
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full">

          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {currentUsers.map((user) => (

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

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
                    {user.role}
                  </span>

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full ${
                      user.status === "blocked"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.status || "active"}
                  </span>

                </td>

                <td className="p-4 text-center relative">

                 <button
  onClick={() =>
    setOpenMenuId(
      openMenuId === user._id
        ? null
        : user._id
    )
  }
  className="text-2xl font-bold px-2"
>
  ⋮
</button>

{openMenuId === user._id && (
  <div className="absolute right-5 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

    {user.status === "blocked" ? (
      <button
        onClick={() => {
          handleStatusChange(user._id, "active");
          setOpenMenuId(null);
        }}
        className="block w-full text-left px-4 py-3 hover:bg-gray-100"
      >
        Unblock User
      </button>
    ) : (
      <button
        onClick={() => {
          handleStatusChange(user._id, "blocked");
          setOpenMenuId(null);
        }}
        className="block w-full text-left px-4 py-3 hover:bg-gray-100"
      >
        Block User
      </button>
    )}

    {user.role === "admin" ? (
      <button
        onClick={() => {
          handleRoleChange(user._id, "volunteer");
          setOpenMenuId(null);
        }}
        className="block w-full text-left px-4 py-3 hover:bg-gray-100"
      >
        Make Volunteer
      </button>
    ) : (
      <button
        onClick={() => {
          handleRoleChange(user._id, "admin");
          setOpenMenuId(null);
        }}
        className="block w-full text-left px-4 py-3 hover:bg-gray-100"
      >
        Make Admin
      </button>
    )}

  </div>
)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex justify-center gap-2 mt-8">

        {[...Array(totalPages)].map(
          (_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>

          )
        )}

      </div>

    </div>
  );
}