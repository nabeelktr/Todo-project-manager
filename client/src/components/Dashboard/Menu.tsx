"use client";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import card1 from "../../../public/assets/card1.png";
import card2 from "../../../public/assets/card2.png";
import card3 from "../../../public/assets/card3.png";

import Image from "next/image";
import { CiCalendar, CiFilter, CiSearch } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import CreateButton from "../Layout/CreateButton";
import ProjectsTable from "./ProjectsTable";
import { ProjectProvider } from "@/contexts/ProjectContext";

type Props = {};
const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

const Menu = (props: Props) => {
  const greeting = getGreeting();
  const user = useSelector((state: any) => state.auth.userName);
  return (
    <div className="pl-4 pt-6 pr-10">
      <div className="flex justify-between items-center">
        <p className="text-5xl tracking-wide font-[500] font-Barlow">
          {greeting}, {user}!
        </p>
        <p className="text-md font-Barlow flex items-center gap-1 text-[#080808]">
          Help & feedback <AiOutlineQuestionCircle />
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-6">
        <div className="px-2 py-4 flex gap-4 items-center bg-white border border-[#F4F4F4] rounded-lg">
          <Image src={card1} alt="" className="h-14 w-20 ml-2" />
          <div>
            <p className="text-md font-[500] text-[#757575]">
              Introducing tags
            </p>
            <p className="text-[#868686] text-sm font-[300]">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>
        <div className="px-2 py-4 flex gap-4 items-center bg-white border border-[#F4F4F4] rounded-lg">
          <Image src={card2} alt="" className="h-14 w-20 ml-2" />
          <div>
            <p className="text-md font-[500] text-[#757575]">
              Share Notes Instantly
            </p>
            <p className="text-[#868686] text-sm font-[300]">
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </p>
          </div>
        </div>
        <div className="px-2 py-4 flex gap-4 items-center bg-white border border-[#F4F4F4] rounded-lg">
          <Image src={card3} alt="" className="h-14 w-20 ml-2" />
          <div>
            <p className="text-md font-[500] text-[#757575]">Access Anywhere</p>
            <p className="text-[#868686] text-sm font-[300]">
              Sync your notes across all devices. Stay productive whether you're
              on your phone, tablet, or computer.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2 ">
          <div className="bg-[#F4F4F4] p-2 flex gap-3 rounded-md items-center justify-center">
            <p className="text-[#797979] text-md font-[300] tracking-wide">
              Calender view
            </p>
            <CiCalendar className="h-6 w-6 text-[#797979]" strokeWidth={0.5} />
          </div>
          <div className="bg-[#F4F4F4] p-2 flex gap-3 rounded-md items-center justify-center">
            <p className="text-[#797979] text-md font-[300] tracking-wide">
              Automation
            </p>
            <BsStars className="h-6 w-6 text-[#797979]" />
          </div>
          <div className="bg-[#F4F4F4] p-2 flex gap-3 rounded-md items-center justify-center">
            <p className="text-[#797979] text-md font-[300] tracking-wide">
              Share
            </p>
            <IoShareSocialOutline className="h-6 w-6 text-[#797979]" />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm ">
            <CreateButton text="Create new" />
          </div>
        </div>
      </div>
      {/* <Dashboard /> */}
      <ProjectsTable />
    </div>
  );
};

export default Menu;
