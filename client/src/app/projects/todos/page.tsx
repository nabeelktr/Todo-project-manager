"use client";
import { useProjects } from "@/contexts/ProjectContext";
import React from "react";
import { useGetTodosQuery } from "../../../../redux/features/apiSlice";
import TodosBoard from "@/components/Todo/TodosBoard";

type Props = {};

const Page = ({}: Props) => {
  const { currentProject } = useProjects();
  const { data: todos, refetch } = useGetTodosQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  return (
    <div className="pl-4 pt-6 pr-10">
      <div className="flex items-center">
        <p className="text-5xl tracking-wide font-[500] font-Barlow">
          {currentProject.title}
        </p>
      </div>
      <TodosBoard />
    </div>
  );
};

export default Page;
