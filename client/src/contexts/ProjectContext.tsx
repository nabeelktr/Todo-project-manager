"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetProjectsQuery } from "../../redux/features/project/projectApi";

const ProjectContext = createContext({
  projects: [],
  refetch: () => {},
  isLoading: false,
  currentProject: { id: "", title: "" },
  setCurrentProject: (currentProject: { id: "", title: "" }) => {},
});

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: projects, isLoading, refetch } = useGetProjectsQuery({}, { refetchOnMountOrArgChange: true });
  const [currentProject, setCurrentProject] = useState(() => {
    if (typeof window !== "undefined") {
      const storedProject = localStorage.getItem('currentProject');
      return storedProject ? JSON.parse(storedProject) : { id: "", title: "" };
    }
    return { id: "", title: "" };
  });

  useEffect(() => {
    if (currentProject && currentProject.id !== "") {
      localStorage.setItem('currentProject', JSON.stringify(currentProject));
    }
  }, [currentProject]);

  return (
    <ProjectContext.Provider value={{ projects, refetch, isLoading, currentProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
