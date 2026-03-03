// import { Server } from "socket.io";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: any, res: any) {
//   if (!res.socket.server.io) {
//     const io = new Server(res.socket.server);

//     res.socket.server.io = io;

//     io.on("connection", (socket) => {
//       socket.on("join_ticket", (ticketId) => {
//         socket.join(`ticket_${ticketId}`);
//       });

//       socket.on("send_message", async (data) => {
//         const message = await prisma.message.create({
//           data: {
//             content: data.content,
//             ticketId: data.ticketId,
//             senderId: data.senderId,
//           },
//           include: { sender: true },
//         });

//         io.to(`ticket_${data.ticketId}`).emit("receive_message", message);
//       });
//     });
//   }

//   return new Response("Socket initialized");
// }

import { NextRequest } from "next/server"
import { Server } from "socket.io"

export async function GET(req: NextRequest) {
  // @ts-ignore
  if (!global.io) {
    console.log("Starting Socket.io server...")

    // @ts-ignore
    global.io = new Server(3001, {
      cors: {
        origin: "*",
      },
    })

    // @ts-ignore
    global.io.on("connection", (socket) => {
      console.log("User connected:", socket.id)

      socket.on("joinTicket", (ticketId: any) => {
        socket.join(ticketId)
      })

     socket.on(
  "sendMessage",
  ({ ticketId, message }: { ticketId: string; message: any }) => {
    globalThis.io?.to(ticketId).emit("receiveMessage", message);
  }
);

      // ✅ ADD THIS
      socket.on("ticketStatusUpdated", ({ ticketId, status }) => {
        globalThis.io?.to(ticketId).emit("ticketStatusUpdated", {
          ticketId,
          status,
        })
      })

      socket.on("disconnect", () => {
        console.log("User disconnected")
      })
    })
  }

  return new Response("Socket server running")
}