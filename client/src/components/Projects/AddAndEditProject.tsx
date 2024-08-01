"use client";
import React, { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddProjectMutation, useUpdateProjectMutation } from "../../../redux/features/project/projectApi";

type ProjectFormData = {
  title: string;
};

type Props = {
  projectId?: string;
  initialData?: ProjectFormData;
};

const projectSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

const ProjectForm: React.FC<Props> = ({ projectId, initialData }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: yupResolver(projectSchema),
    defaultValues: initialData || { title: "" },
  });

  const [addProject] = useAddProjectMutation();
  const [editProject] = useUpdateProjectMutation();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);


  const onSubmit = async (data: ProjectFormData) => {
      if (projectId) {
        await editProject({ projectId, ...data });
      } else {
        await addProject({ ...data });
      }
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
