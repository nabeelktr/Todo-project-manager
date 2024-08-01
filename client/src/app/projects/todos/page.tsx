"use client"
import { useProjects } from '@/contexts/ProjectContext'
import React from 'react'
import { useGetTodosQuery } from '../../../../redux/features/apiSlice'

type Props = {
}

const Page = ({}: Props) => {
    const {currentProject} = useProjects();
    const {data: todos, refetch} = useGetTodosQuery({}, {refetchOnMountOrArgChange:true})
  return (
    <div>Todos</div>
  )
}

export default Page