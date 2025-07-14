// import { Socket, Server } from "socket.io";
// import http from "http";
// import express from "express";
// import dotenv from "dotenv"; // 👈 load .env

// import { UserManager } from "./managers/UserManager";

// // Load environment variables
// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN || "*",
//   }
// });

// const userManager = new UserManager();

// io.on("connection", (socket: Socket) => {
//   console.log("a user connected");
//   userManager.addUser("random", socket);

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     userManager.removeUser(socket.id);
//   });
// });

// // Read port from .env or fallback to 3000
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`listening on *:${PORT} dev`);
// });


import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { UserManager } from "./managers/UserManager";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

const userManager = new UserManager();

io.on("connection", (socket: Socket) => {
  console.log("✅ User connected:", socket.id);
  userManager.addUser("random", socket);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    userManager.removeUser(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
