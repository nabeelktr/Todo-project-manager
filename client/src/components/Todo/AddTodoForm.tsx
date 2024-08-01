"use client";
import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../utils/yup";
import { socketId } from "../../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";
import { FiLoader } from "react-icons/fi";
import { BsExclamationDiamond } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { GoPencil, GoPlus } from "react-icons/go";
import { format } from "date-fns";
import { useDrawer } from "@/contexts/DrawerContext";
import { useAddTodoMutation } from "../../../redux/features/apiSlice";


type TodoFormData = {
  title: string;
  description?: string | undefined;
  priority: string;
  dueDate: Date;
  status: string;
};

type Props = {
  status: string;
};

const AddTodoForm: React.FC<Props> = ({status}) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const { setDrawerOpen} = useDrawer()
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: yupResolver(taskSchema),
  });
  const [addTodo, { isSuccess, error, isError }] = useAddTodoMutation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isError || error) {
      console.log("error", isError, error);
      dispatch(userLoggedOut());
    }
  }, [isError, error]);

  const onSubmit = async (data: TodoFormData) => {
    if (isLoggedIn) {
      await addTodo({ ...data });
      setDrawerOpen("")
      socketId.emit("tasks", { data: "task added" });
    }
  };

   useEffect(() => {
    const formElement = formRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    if (formElement) {
      formElement.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleSubmit]);

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
      <div>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="text"
              {...field}
              className={
                "text-4xl mb-4 font-[550] text-gray-600 tracking-wide  placeholder:text-[#CCCCCC] w-full py-2 px-2"
              }
              placeholder={"Title"}
            />
          )}
        />
        <p className="text-xs text-red-400 pt-1">{errors.title?.message}</p>
      </div>

      <div className="grid grid-cols-6 items-center  px-2 text-md tracking-wide">
        <div className="text-[#666666] col-span-2 flex gap-5 items-center">
          <FiLoader
            className="h-6 w-6 font-[400] text-gray-500"
            style={{ strokeWidth: 1.5 }}
          />
          <p>Status</p>
        </div>
        <Controller
          name="status"
          control={control}
          defaultValue={status !== "" ? status : ""}
          render={({ field }) => (
            <select
              {...field}
              className={`w-full text-[#666666] py-2 col-span-4 text-md tracking-wide`}
            >
              <option value="">Not Selected</option>
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Under review">Under review</option>
              <option value="Finished">Finished</option>
            </select>
          )}
        />
      </div>
      <p className="text-xs text-red-400 pt-1">{errors.status?.message}</p>

      <div className="grid grid-cols-6 items-center  px-2 text-md tracking-wide">
        <div className="text-[#666666] col-span-2 flex gap-5 items-center">
          <BsExclamationDiamond
            className="h-6 w-6 font-[400] text-gray-500"
            style={{ strokeWidth: 0 }}
          />
          <p>Priority</p>
        </div>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className={`w-full col-span-4 text-[#666666] py-2 text-md tracking-wide`}
            >
              <option value="">Not Selected</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          )}
        />
      </div>
      <p className="text-xs text-red-400 pt-1">{errors.priority?.message}</p>

      <div className="grid grid-cols-6 items-center   text-md tracking-wide px-2">
        <div className="text-[#666666] col-span-2 flex gap-5 items-center">
          <CiCalendar
            className="h-6 w-6 font-[400] text-gray-500"
            style={{ strokeWidth: 0.5 }}
          />
          <p>Deadline</p>
        </div>
        <div className="relative w-full col-span-4">
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <div className="relative w-full">
                <input
                  type="text"
                  onFocus={(e: any) => (e.target.type = "date")}
                  {...field}
                  className={`w-full py-2 px-1 placeholder:text-[#666666] text-md tracking-wide ${
                    !field.value ? "text-transparent" : "text-[#666666]"
                  }`}
                  value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : ''}
                  placeholder="Not Selected"
                />
              </div>
            )}
          />
        </div>
      </div>
      <p className="text-xs text-red-400 pt-1">{errors.dueDate?.message}</p>

      <div className="grid grid-cols-6 items-center px-2 text-md tracking-wide">
        <div className="text-[#666666] col-span-2 flex gap-5 items-center">
          <GoPencil
            className="h-6 w-6 font-[400] text-gray-500"
            style={{ strokeWidth: 0 }}
          />
          <p>Description</p>
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Not Selected"
              className="w-full text-[#666666] py-2 px-1 col-span-4  text-md tracking-wide placeholder:text-[#666666] outline-none resize-none"
              rows={1}
            />
          )}
        />
      </div>
      <p className="text-xs text-red-400 pt-1">{errors.description?.message}</p>

      <div className="grid grid-cols-6 items-center   text-md tracking-wide px-2">
        <div className=" col-span-2 flex gap-5 items-center">
          <GoPlus
            className="h-6 w-6"
            style={{ strokeWidth: 0.001 }}
          />
          <p>Add custom property</p>
        </div>
        </div>
      <div className="border-b py-3 border-gray-400 h-3 "></div>


      <button type="submit" className={`text-white`}>
        Add Task
      </button>
    </form>
  );
};

export default AddTodoForm;
