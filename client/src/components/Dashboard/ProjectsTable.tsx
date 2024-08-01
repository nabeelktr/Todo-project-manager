"use client"
import React from 'react'
import { useGetProjectsQuery } from '../../../redux/features/project/projectApi';
import Link from 'next/link';
import { IoEyeSharp } from 'react-icons/io5';
import Loader from '@/utils/Loader/Loader';
import BasicTable from '@/utils/Table/BasicTable';

type Props = {}

const ProjectsTable = (props: Props) => {
    const {
        data: projects,
        error,
        isLoading,
        refetch,
      } = useGetProjectsQuery({});

      const columns = [
        {
          header: "Title",
          accessorKey: "title",
        },
        {
          header: "Created at",
          accessorKey: "createdAt",
        },
        {
          header: "Todos",
          accessorKey: "todos",
          cell: (info: any) => {
            const todos = info.getValue();
            return (
              <p
                className={`uppercase text-xs`}
              >
                {todos?.length}
              </p>
            );
          },
        },
        {
          header: "View",
          cell: (info: any) => {
              return (
                <Link href={'/todos'} >
                  <IoEyeSharp className="cursor-pointer h-6 w-6 rounded-lg hover:bg-gray-300 p-2" />
                </Link>
              );
            }
        },
      ];
  return (
    <div>
        {isLoading ? (
            <Loader />
          ) : 
            projects &&( <BasicTable datas={projects} columns={columns} />)
          }
    </div>
  )
}

export default ProjectsTable