"use client";
import Heading from "@/utils/Heading";
import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

type Props = {};

const AuthPage = (props: Props) => {
  const [route, setRoute] = useState("Login");
  return (
    <>
      <Heading
        description="A comprehensive system for managing tasks "
        keywords="Task,Task Management,Kanban"
        title={route}
      />

      {route === "Login" ? (
        <Login setRoute={setRoute} />
      ) : (
        <SignUp setRoute={setRoute} />
      )}
    </>
  );
};

export default AuthPage;
