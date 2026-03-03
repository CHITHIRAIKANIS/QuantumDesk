// "use client"

// import { useEffect, useState } from "react"
// import { socket } from "@/lib/socket";
// import { useParams } from "next/navigation"

// export default function TicketDetail() {
//   const { id } = useParams()
//   const [ticket, setTicket] = useState<any>(null)
//   const [message, setMessage] = useState("")
//   const [userId, setUserId] = useState<string | null>(null)
  


// useEffect(() => {
//   if (!id) return;

//   const token = localStorage.getItem("token");

//   fetch(`/api/tickets/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(async (res) => {
//       if (!res.ok) {
//         console.error(await res.json());
//         return;
//       }
//       return res.json();
//     })
//     .then((data) => {
//       setTicket(data);
//     })
//     .catch((err) => console.error(err));
// }, [id]);
 
// useEffect(() => {
//   if (!id) return;

//   // Join ticket room
//   socket.emit("join_ticket", id);

//   // Listen for new messages
//   socket.on("receive_message", (newMessage) => {
//     setTicket((prev: any) => ({
//       ...prev,
//       messages: [...prev.messages, newMessage],
//     }));
//   });

//   return () => {
//     socket.off("receive_message");
//   };
// }, [id]);

// const sendMessage = async () => {
//   if (!message.trim()) return;

//   const res = await fetch(`/api/tickets/${id}/messages`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       body: message,
//       authorId: localStorage.getItem("userId"),
//     }),
//   });

//   if (!res.ok) {
//     alert("Failed to send message");
//     return;
//   }

//   const newMessage = await res.json();

//   // 🔥 Emit to socket so others receive it
//   socket.emit("send_message", {
//     ...newMessage,
//     ticketId: id,
//   });

//   // Optional: you can REMOVE this to avoid duplicate
//   // Because socket will send back to this client also
//   // But for safety, we keep it:
//   setTicket((prev: any) => ({
//     ...prev,
//     messages: [...prev.messages, newMessage],
//   }));

//   setMessage("");
// };

//   // const changeStatus = async (status: string) => {
//   //   await fetch(`/api/tickets/${id}/status`, {
//   //     method: "PATCH",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ status })
//   //   })
//   // }
// const changeStatus = async (status: string) => {
//   try {
//     const res = await fetch(`/api/tickets/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status }),
//     });

//     if (!res.ok) {
//       alert("Failed to update status");
//       return;
//     }

//     const updatedTicket = await res.json();

//     // Update UI immediately
//     setTicket((prev: any) => ({
//       ...prev,
//       status: updatedTicket.status,
//     }));

//     // Optional: if using socket server
//     // socket.emit("ticket_updated", updatedTicket.status);

//   } catch (error) {
//     console.error(error);
//   }
// };
//   if (!ticket) return <p>Loading...</p>

// return (
//   <div className="min-h-screen bg-gray-50 p-6">
//     <div className="max-w-4xl mx-auto space-y-6">

//       {/* Ticket Header Card */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border">
//         <h1 className="text-2xl font-bold text-gray-800">
//          Ticket Title: {ticket.title}
//         </h1>

//         <div className="mt-3 flex items-center gap-3">
//           <span className="text-sm text-gray-500">
//             Status:
//           </span>

//           <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
//             {ticket.status}
//           </span>
//         </div>

//         {/* Status Update */}
//         <div className="mt-4">
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Update Status
//           </label>

//           <select
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             value={ticket.status}
//             onChange={(e) => changeStatus(e.target.value)}
//           >
//             <option value="OPEN">OPEN</option>
//             <option value="PENDING">PENDING</option>
//             <option value="RESOLVED">RESOLVED</option>
//           </select>
//         </div>
//       </div>

//       {/* Messages Card */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border">
//         <h2 className="text-lg font-semibold mb-4">
//           Conversation
//         </h2>

//         <div className="space-y-3 max-h-80 overflow-y-auto">
//           {ticket?.messages?.map((msg: any) => (
//             <div
//               key={msg.id}
//               className="p-3 rounded-lg bg-gray-100"
//             >
//               <div className="text-sm font-semibold text-gray-700">
//                 {msg.sender?.name}
//               </div>
//               <div className="text-gray-800">
//                 {msg.content}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Send Message */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border flex gap-2">
//         <input
//           className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//         />

//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
//         >
//           Send
//         </button>
//       </div>

//     </div>
//   </div>
// );
// }


"use client"

import { useEffect, useState } from "react"
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation"

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [role, setRole] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

useEffect(() => {
  const storedRole = localStorage.getItem("role")

  if (storedRole) {
    setRole(storedRole) // no JSON.parse
  }
}, [])

  // Fetch ticket
  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");

    fetch(`/api/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error(await res.json());
          return;
        }
        return res.json();
      })
      .then((data) => {
        setTicket(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Socket logic
  useEffect(() => {
    if (!id) return;

    socket.emit("join_ticket", id);

    socket.on("receive_message", (newMessage) => {
      setTicket((prev: any) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
    });

    return () => {
      socket.off("receive_message");
    };
  }, [id]);

const sendMessage = async () => {
  if (!message.trim()) return;

  setSending(true);

  try {
    const res = await fetch(`/api/tickets/${id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: message,
        authorId: localStorage.getItem("userId"),
      }),
    });

    if (!res.ok) {
      alert("Failed to send message");
      setSending(false);
      return;
    }

    const newMessage = await res.json();

    socket.emit("send_message", {
      ...newMessage,
      ticketId: id,
    });

    setMessage("");
  } catch (error) {
    console.error(error);
  }

  setSending(false);
};
  // Change status (AGENT ONLY)
  const changeStatus = async (status: string) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        alert("Failed to update status");
        return;
      }

      const updatedTicket = await res.json();

      setTicket((prev: any) => ({
        ...prev,
        status: updatedTicket.status,
      }));

    } catch (error) {
      console.error(error);
    }
  };

  if (!ticket) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Ticket Header Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h1 className="text-2xl font-bold text-gray-800">
            Ticket Title: {ticket.title}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Status:
            </span>

            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              {ticket.status}
            </span>
          </div>

          {/* ✅ Role-based Status Control */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Status
            </label>

            {role === "agent" ?  (
              <select
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={ticket.status}
                onChange={(e) => changeStatus(e.target.value)}
              >
                <option value="OPEN">OPEN</option>
                <option value="PENDING">PENDING</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            ) : (
              <div className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700">
                {ticket.status}
              </div>
            )}
          </div>
        </div>

        {/* Messages Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Conversation
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {ticket?.messages?.map((msg: any) => (
              <div
                key={msg.id}
                className="p-3 rounded-lg bg-gray-100"
              >
                <div className="text-sm font-semibold text-gray-700">
                  {msg.sender?.name}
                </div>
                <div className="text-gray-800">
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Send Message */}
        <div className="bg-white p-4 rounded-xl shadow-sm border flex gap-2">
          <input
            className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />

          {/* <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Send
          </button> */}
          <button
  onClick={sendMessage}
  disabled={sending}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {sending ? "Sending..." : "Send"}
</button>
        </div>

      </div>
    </div>
  );
}