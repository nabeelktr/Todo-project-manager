import socketIO from "socket.io-client";
const EndPoint =  "http://ec2-3-84-135-13.compute-1.amazonaws.com:3002";
export const socketId = socketIO(EndPoint,{ transports: ["websocket"] ,path: "/socket.io"});