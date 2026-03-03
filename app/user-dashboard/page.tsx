"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  router.push("/login");
};
 useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const userId = localStorage.getItem("userId")

    if (!token) {
      router.push("/login")
      return
    }

    if (role !== "user") {
      router.push("/dashboard")
      return
    }

    // ✅ Send userId to API
    fetch(`/api/tickets?userId=${userId}&role=${role}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        debugger;
        setTickets(data)})
      .catch(err => console.error(err))

  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Tickets</h1>
<button
  onClick={handleLogout}
  className="bg-red-500 text-white px-4 py-2 rounded ml-4"
>
  Logout
</button>
      <button
        onClick={() => router.push("/create-ticket")}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Create Ticket
      </button>

      <div className="mt-6 space-y-4">
        {tickets.map((ticket: any) => (
          <div key={ticket.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{ticket.title}</h2>
            <p>Status: {ticket.status}</p>

            <button
              onClick={() => router.push(`/tickets/${ticket.id}`)}
              className="text-blue-600 mt-2"
            >
              View Conversation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}