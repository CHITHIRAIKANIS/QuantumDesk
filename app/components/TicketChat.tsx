"use client"

import { useEffect, useState } from "react"
// import { socket } from "@/lib/socket"  socket related

interface Props {
  ticketId: string
}

export default function TicketChat({ ticketId }: Props) {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  // useEffect(() => {
  //   socket.emit("joinTicket", ticketId)

  //   socket.on("receiveMessage", (message: string) => {
  //     setMessages((prev) => [...prev, message])
  //   })

  //   return () => {
  //     socket.off("receiveMessage")
  //   }
  // }, [ticketId]) socket related

  const sendMessage = () => {
    if (!input.trim()) return

    // socket.emit("sendMessage", {
    //   ticketId,
    //   message: input,
    // })

    setInput("")
  }

  return (
    <div style={{ border: "1px solid gray", padding: 10, marginTop: 10 }}>
      <h4>Chat</h4>

      <div style={{ height: 150, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}