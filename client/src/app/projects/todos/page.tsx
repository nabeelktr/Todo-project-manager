"use client"
import { useProjects } from '@/contexts/ProjectContext'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
}

const Page = ({}: Props) => {
    const {currentProject} = useProjects();
  return (
    <div>Todos</div>
  )
}

export default Page