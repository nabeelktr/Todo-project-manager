"use client";
import React, { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "../../../redux/features/project/projectApi";
import { projectSchema } from "@/utils/yup";
import { toast } from "sonner";
import { useProjects } from "@/contexts/ProjectContext";

type ProjectFormData = {
  title: string;
};

type Props = {
  projectId?: string;
  title?: string;
  setOpen: any;
};

const ProjectForm: React.FC<Props> = ({ projectId, title, setOpen }) => {
  const { refetch } = useProjects();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema),
    defaultValues: { title: title || "" },
  });

  const [addProject] = useAddProjectMutation({});
  const [editProject] = useUpdateProjectMutation({});

  useEffect(() => {
    if (title) {
      reset({ title });
    }
  }, [title, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    if (projectId) {
      await editProject({ _id: projectId, ...data });
      toast.success(`Project updated successfully`);
    } else {
      await addProject({ ...data });
      toast.success(`Project added successfully`);
    }
    refetch();
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className="text-4xl mb-4 font-[550] text-gray-600 tracking-wide placeholder:text-[#CCCCCC] w-full py-2 px-2"
              placeholder={"Title"}
            />
          )}
        />
        <p className="text-xs text-red-400 pt-1">{errors.title?.message}</p>
      </div>
      <button type="submit" className="text-white bg-black rounded-lg p-2">
        {projectId ? "Edit Project" : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
