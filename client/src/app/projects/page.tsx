import Heading from "@/utils/Heading";
import React from "react";
import Protected from "@/hooks/useProtected";
import SideBar from "@/components/Layout/SideBar";
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
      <div className="grid grid-cols-5">
        <div className="col-span-1 border-[#DEDEDE] border-r-2">
          <SideBar />
        </div>
        <div className="col-span-4 bg-[#F7F7F7]">
          <Menu />
        </div>
      </div>
      </Protected>
    </>
  );
};

export default Page;
