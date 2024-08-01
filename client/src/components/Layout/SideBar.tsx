"use client"
import React, { useEffect } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { FiChevronsRight, FiLoader } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuBellDot, LuUsers2 } from "react-icons/lu";
import { MdOutlineAnalytics } from "react-icons/md";
import { TfiDownload } from "react-icons/tfi";
import { useLogOutMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import CreateButton from "./CreateButton";

type Props = {};

const SideBar = (props: Props) => {
  const [logoutUser, {isSuccess}] = useLogOutMutation()
  const user = useSelector((state: any) => state.auth.userName)

  useEffect(() => {
    if(isSuccess){
      toast.success("Logout successful")
    }
  }, [isSuccess])
  return (
    <div className="px-4 py-6 flex flex-col h-screen justify-between">
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt=""
              className="h-8 rounded-xl"
            />
            <p className="text-xl flex items-center tracking-wide">
              {user}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <LuBellDot
                className="h-6 w-6 font-[400] text-gray-500"
                style={{ strokeWidth: 1.5 }}
              />
              <div className="relative">
                <FiLoader
                  className="h-6 w-6 font-[400] text-gray-500"
                  style={{ strokeWidth: 1.5 }}
                />
                <span className="absolute h-[9px] w-[9px] bg-[#FFB800] top-0 right-0 rounded-3xl"></span>
              </div>
              <FiChevronsRight
                className="h-6 w-6  text-gray-500"
                style={{ strokeWidth: 1.5 }}
              />
            </div>
            <button className="bg-[#F4F4F4] tracking-wide px-3 py-2 rounded-md text-[#797979] hover:bg-gray-200 " onClick={(async () =>await logoutUser({}))}>
              Logout
            </button>
          </div>
        </div>

        <ul className="mt-5">
          <li className="flex gap-3 p-2 cursor-pointer bg-[#F4F4F4] items-center rounded-md border border-[#DEDEDE]">
            <BiHomeAlt2 className="h-6 w-6 font-[400] text-gray-600" style={{ strokeWidth: 0.01 }}/>
            <p className="text-lg text-[#797979] tracking-wide font-[300]"> Home</p>
          </li>
          <li className="flex gap-3 p-2 cursor-pointer items-center hover:bg-[#F4F4F4] rounded-md">
            <MdOutlineAnalytics className="h-6 w-6 font-[400] text-gray-600" style={{ strokeWidth: 0.01 }}/>
            <p className="text-lg text-[#797979] tracking-wide font-[300]"> Boards </p>
          </li>
          <li className="flex gap-3 p-2 cursor-pointer items-center hover:bg-[#F4F4F4] rounded-md">
            <IoSettingsOutline className="h-6 w-6 font-[400] text-gray-600" style={{ strokeWidth: 0.01 }}/>
            <p className="text-lg text-[#797979] tracking-wide font-[300]">Settings </p>
          </li>
          <li className="flex gap-3 p-2 cursor-pointer items-center hover:bg-[#F4F4F4] rounded-md">
            <LuUsers2 className="h-6 w-6 font-[400] text-gray-600" style={{ strokeWidth: 1.5 }} />
            <p className="text-lg text-[#797979] tracking-wide font-[300]">Team</p>
          </li>
          <li className="flex gap-3 p-2 cursor-pointer items-center hover:bg-[#F4F4F4] rounded-md">
            <BsGraphUp className="h-6 w-6 p-1 font-[400] text-gray-600" style={{ strokeWidth: 0.5 }} />
            <p className="text-lg text-[#797979] tracking-wide font-[300]">Analytics </p>
          </li>
        </ul>

        <div className="text-lg mt-5">
          <CreateButton text="Create new task"/>
        </div>
      </div>
      <div className="bg-[#F3F3F3] w-full px-4 py-2 items-center flex gap-6 rounded-lg text-[#666666]">
        <TfiDownload className="h-7 w-7" />
        <div className="flex flex-col ">
          <p className="text-lg font-[500]">Download the app</p>
          <p className="text-sm">Get the full experience</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
