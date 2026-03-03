"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateTicket() {
  const [title, setTitle] = useState("")
  const router = useRouter()
  const customerId = "CUSTOMER_ID_FROM_SEED"

  const create = async () => {
    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        createdById: customerId
      })
    })

    router.push("/customer")
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Ticket</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ticket title"
      />
      <button onClick={create}>Create</button>
    </div>
  )
}