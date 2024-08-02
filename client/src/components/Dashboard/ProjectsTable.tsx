"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
import Loader from "@/utils/Loader/Loader";
import BasicTable from "@/utils/Table/BasicTable";
import { BsPencil } from "react-icons/bs";
import CustomModal from "@/utils/Modal/CustomModal";
import ProjectForm from "../Projects/AddAndEditProject";
import { useProjects } from "@/contexts/ProjectContext";
import { useRouter } from "next/navigation";

type Props = {};

const ProjectsTable = (props: Props) => {
  const { setCurrentProject } = useProjects();
  const router = useRouter();
  const { projects, refetch, isLoading } = useProjects();
  const [data, setData] = useState({
    id: "",
    title: "",
  });
  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (info: any) => {
        const date = info.getValue();
        return new Date(date).toLocaleDateString();
      },
    },
    {
      header: "Todos",
      accessorKey: "todos",
      cell: (info: any) => {
        const todos = info.getValue();
        return <p className={`uppercase text-xs`}>{todos?.length}</p>;
      },
    },
    {
      header: "View",
      cell: (info: any) => {
        const handleView = () => {
          const datas = {
            id: info.cell.row.original._id,
            title: info.cell.row.original.title,
          };
          setCurrentProject({ ...datas });
          router.push("/projects/todos");
        };
        return (
          <p onClick={handleView}>
            <IoEyeSharp className="cursor-pointer h-8 w-8 rounded-lg hover:bg-gray-300 p-2" />
          </p>
        );
      },
    },
    {
      header: "Edit",
      cell: (info: any) => {
        const handleEdit = () => {
          const datas = {
            id: info.cell.row.original._id,
            title: info.cell.row.original.title,
          };
          setData({ ...datas });
          if (data.id.length > 0) {
            setOpen(true);
          }
        };
        return (
          <p onClick={handleEdit}>
            <BsPencil className="cursor-pointer h-8 w-8 rounded-lg hover:bg-gray-300 p-2" />
          </p>
        );
      },
    },
  ];
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        projects && <BasicTable datas={projects} columns={columns} />
      )}
      {open && (
        <CustomModal open={open} setOpen={setOpen} component={ProjectForm} projectId={data.id} title={data.title} />
      )}
    </div>
  );
};

export default ProjectsTable;
