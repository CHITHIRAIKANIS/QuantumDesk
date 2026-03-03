import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_ticket", (ticketId) => {
      socket.join(`ticket_${ticketId}`);
    });

    socket.on("send_message", (data) => {
      io.to(`ticket_${data.ticketId}`).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});