"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AgentPage() {
  const [tickets, setTickets] = useState([])
  const agentId = "AGENT_ID_FROM_SEED"

  useEffect(() => {
    fetch(`/api/tickets?role=AGENT&userId=${agentId}`)
      .then(res => res.json())
      .then(setTickets)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Agent Inbox</h1>

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