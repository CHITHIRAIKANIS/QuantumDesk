"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";


export default function CustomerPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState([])
  

  // useEffect(() => {
  //   fetch(`/api/tickets?role=CUSTOMER&userId=${customerId}`)
  //     .then(res => res.json())
  //     .then(setTickets)
  // }, [])

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
    <div style={{ padding: 20 }}>
      <h1>Customer Portal</h1>

      <Link href="/customer/create">Create Ticket</Link>

      <ul>
        {tickets.map((ticket: any) => (
          <li key={ticket.id}>
            <Link href={`/tickets/${ticket.id}`}>
              {ticket.title} - {ticket.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}