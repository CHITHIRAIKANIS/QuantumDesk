"use client"

import { useState } from "react"
import TicketChat from "./TicketChat"

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  assignedTo: string
}

export default function TicketList() {
  const [tickets] = useState<Ticket[]>([
    {
      id: "1",
      title: "Login Issue",
      description: "Cannot login to dashboard",
      status: "Open",
      assignedTo: "Agent A",
    },
    {
      id: "2",
      title: "Payment Failed",
      description: "Transaction error",
      status: "In Progress",
      assignedTo: "Agent B",
    },
  ])

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  return (
    <div>
      <h2>Your Tickets</h2>

      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{ border: "1px solid black", padding: 10, marginBottom: 10 }}
        >
          <p><strong>Title:</strong> {ticket.title}</p>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>

          <button onClick={() => setSelectedTicketId(ticket.id)}>
            Open Chat
          </button>

          {selectedTicketId === ticket.id && (
            <TicketChat ticketId={ticket.id} />
          )}
        </div>
      ))}
    </div>
  )
}