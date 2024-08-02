"use client";
import { useProjects } from "@/contexts/ProjectContext";
import React, { useEffect } from "react";
import { useGetTodosQuery } from "../../../../redux/features/apiSlice";
import TodosBoard from "@/components/Todo/TodosBoard";
import { CiCalendar } from "react-icons/ci";
import { BsStars } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { styles } from "@/styles/style";
import { FaSave } from "react-icons/fa";
import { useExportProjectMutation } from "../../../../redux/features/project/projectApi";
import { toast } from "sonner";

type Props = {};

const Page = ({}: Props) => {
  const { currentProject } = useProjects();
  const [exportProject, {isSuccess}] = useExportProjectMutation()

  useEffect(() => {
    if(isSuccess){
      toast.success("Project exported successful")
    }
  }, [isSuccess])

  const handleExport = async () => {
    await exportProject({
      _id: currentProject.id,
      title: currentProject.title,
      todos: []
    })
  }
  return (
    <div className="pl-4 pt-6 pr-10">
      <div className="flex items-center">
        <p className="text-5xl tracking-wide font-[500] font-Barlow">
          {currentProject.title}
        </p>
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
            <button
              style={{
                background:
                  "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
                border: "1px solid",
                borderImageSource:
                  "linear-gradient(360deg, #4B36CC 0%, #9C93D4 107.69%)",
                borderImageSlice: 1,
                boxShadow:
                  "0px 4px 16px 0px #0000001A, 0px 12px 16px 0px #BABABA33 inset",
              }}
              className={`${styles.button} hover:shadow-4xl flex gap-2 items-center justify-center px-2 `}
              onClick={handleExport}
            >
              Export <FaSave className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>
      <TodosBoard />
    </div>
  );
};

export default Page;
