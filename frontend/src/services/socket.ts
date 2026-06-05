import { io } from "socket.io-client";

export const socket = io("https://velyra-app-puce.vercel.app", {
  transports: ["websocket", "polling"],
});