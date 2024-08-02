"use client";
import { useDrawer } from "@/contexts/DrawerContext";
import React from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import { ImEnlarge2 } from "react-icons/im";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import AddTodoForm from "./AddTodoForm";


const TodoModal: React.FC = () => {
  const { isDrawerOpen, setDrawerOpen } = useDrawer();
  const closeDrawer = () => setDrawerOpen("");
  return (
    <>
      <Drawer
        size={670}
        open={isDrawerOpen !== ""}
        onClose={closeDrawer}
        className="p-2 px-4 pr-6 pt-4"
        placeholder={undefined}
        onPointerEnterCapture={() => {}} 
        onPointerLeaveCapture={() => {}}
        placement="right"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer} placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#797979"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
            <ImEnlarge2 className="text-[#797979] h-3 w-3" />
          </div>
          <div className="flex gap-4">
          <div className="bg-[#F4F4F4] p-2 flex gap-3 rounded-md items-center justify-center">
                <p className="text-[#797979] text-md font-[300] tracking-wide">Share</p>
                <IoShareSocialOutline className="h-6 w-6 text-[#797979]"  />
            </div>
            <div className="bg-[#F4F4F4] p-2 flex gap-3 rounded-md items-center justify-center">
                <p className="text-[#797979] text-md font-[300] tracking-wide">Favourite</p>
                <CiStar className="h-6 w-6 text-[#797979]"  />
            </div>
          </div>
        </div>
        <div>
          <AddTodoForm status={isDrawerOpen} />
        </div>
      </Drawer>
    </>
  );
};

export default TodoModal;
