"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import io from "socket.io-client";

// const socket = io();

interface Ticket {
  id: number;
  title: string;
  status: string;
  priority: string;
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
 const router = useRouter();
  // useEffect(() => {
  //   fetch("/api/socket"); // initialize server
  //   // Replace with your backend API
  //   fetch("http://localhost:5000/api/tickets")
  //     .then((res) => res.json())
  //     .then((data) => setTickets(data))
  //     .catch((err) => console.error(err));
  // }, []);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  fetch("/api/tickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        console.error("API Error:", await res.json());
        return;
      }
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setTickets(data);
      }
    })
    .catch((err) => console.error(err));
}, []);

const total = tickets.length;

const open = tickets.filter(
  t => t.status?.toUpperCase() === "OPEN"
).length;

const pending = tickets.filter(
  t => t.status?.toUpperCase() === "PENDING"
).length;

const resolved = tickets.filter(
  t => t.status?.toUpperCase() === "RESOLVED"
).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          href="/create-ticket"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Ticket
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Tickets</h2>
          <p className="text-2xl font-bold mt-2">{total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Open</h2>
          <p className="text-2xl font-bold mt-2 text-yellow-600">{open}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Resolved</h2>
         <p className="text-2xl font-bold mt-2 text-green-600">{resolved}</p>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">All Tickets</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
            </tr>
          </thead>
          {/* <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-t">
                <td className="p-3">{ticket.id}</td>
                <td className="p-3">{ticket.title}</td>
                <td className="p-3 capitalize">{ticket.status}</td>
                <td className="p-3 capitalize">{ticket.priority}</td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
 {tickets.map((ticket: any, index: number) => (
  <tr
    key={ticket.id}
    className="border-t hover:bg-gray-100"
  >
    {/* Serial Number */}
    <td className="p-3">
      {index + 1}
    </td>

    {/* 🔵 Only Title is Clickable */}
    <td
      className="p-3 text-blue-600 underline cursor-pointer hover:text-blue-800"
      onClick={() => router.push(`/tickets/${ticket.id}`)}
    >
      {ticket.title}
    </td>

    <td className="p-3 capitalize">{ticket.status}</td>
    <td className="p-3 capitalize">{ticket.priority}</td>
  </tr>
))}
</tbody>
        </table>

        {tickets.length === 0 && (
          <p className="text-gray-500 mt-4">No tickets found.</p>
        )}
      </div>
    </div>
  );
}

//First level comment
// "use client";

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// type Message = {
//   id: number;
//   content: string;
//   sender: { name: string };
// };

// type Ticket = {
//   id: number;
//   title: string;
//   description: string;
//   status: string;
//   assignee?: { name: string };
//   messages: Message[];
// };

// let socket: any;

// export default function Dashboard() {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
//   const [messageInput, setMessageInput] = useState("");

//   // Initialize socket
//   useEffect(() => {
//     fetch("/api/socket");
//     socket = io();

//     socket.on("receive_message", (msg: Message) => {
//       setTickets((prev) =>
//         prev.map((ticket) =>
//           ticket.id === selectedTicket?.id
//             ? { ...ticket, messages: [...ticket.messages, msg] }
//             : ticket
//         )
//       );
//     });
//   }, [selectedTicket]);

//   // Fetch tickets
//   useEffect(() => {
//     fetch("/api/tickets")
//       .then((res) => res.json())
//       .then(setTickets);
//   }, []);

//   const selectTicket = (ticket: Ticket) => {
//     setSelectedTicket(ticket);
//     socket.emit("join_ticket", ticket.id);
//   };

//   const sendMessage = () => {
//     if (!selectedTicket || !messageInput) return;

//     socket.emit("send_message", {
//       content: messageInput,
//       ticketId: selectedTicket.id,
//       senderId: 1, // replace with real userId later
//     });

//     setMessageInput("");
//   };

//   return (
//     <div style={{ display: "flex", padding: "20px" }}>
//       {/* LEFT SIDE - TICKETS */}
//       <div style={{ width: "40%", borderRight: "1px solid gray" }}>
//         <h2>Your Tickets</h2>

//         <button
//           onClick={() => alert("Open Create Ticket Modal")}
//           style={{ marginBottom: "10px" }}
//         >
//           + Create Ticket
//         </button>

//         {tickets.map((ticket) => (
//           <div
//             key={ticket.id}
//             onClick={() => selectTicket(ticket)}
//             style={{
//               padding: "10px",
//               cursor: "pointer",
//               borderBottom: "1px solid #ccc",
//             }}
//           >
//             <h4>{ticket.title}</h4>
//             <p>{ticket.description}</p>
//             <p>Status: {ticket.status}</p>
//             <p>
//               Assigned To:{" "}
//               {ticket.assignee ? ticket.assignee.name : "Not Assigned"}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT SIDE - CHAT */}
//       <div style={{ width: "60%", paddingLeft: "20px" }}>
//         {selectedTicket ? (
//           <>
//             <h3>Chat - {selectedTicket.title}</h3>

//             <div
//               style={{
//                 height: "300px",
//                 overflowY: "auto",
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 marginBottom: "10px",
//               }}
//             >
//               {selectedTicket.messages.map((msg) => (
//                 <div key={msg.id}>
//                   <strong>{msg.sender.name}:</strong> {msg.content}
//                 </div>
//               ))}
//             </div>

//             <input
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               placeholder="Type message..."
//               style={{ width: "80%" }}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </>
//         ) : (
//           <p>Select a ticket to open chat</p>
//         )}
//       </div>
//     </div>
//   );
// }