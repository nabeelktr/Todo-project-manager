"use client";
import { socketId } from "../utils/socket";
import { FC, useEffect } from "react";

export const SocketProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);
  return <>{children}</>;
};
