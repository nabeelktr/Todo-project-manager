import socketIO from "socket.io-client";
const EndPoint =  "http://localhost:3002";
export const socketId = socketIO(EndPoint,{ transports: ["websocket"] ,path: "/socket.io"});