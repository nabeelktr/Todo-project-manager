import Heading from "@/utils/Heading";
import React from "react";
import Protected from "@/hooks/useProtected";
import Menu from "@/components/Dashboard/Menu";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <Protected>
        <Heading
          description="A comprehensive system for managing tasks "
          keywords="Task,Task Management,Kanban"
          title="Dashboard"
        />
        <Menu />
      </Protected>
    </>
  );
};

export default Page;
