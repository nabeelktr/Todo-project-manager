import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../utils/yup";
import { socketId } from "../../utils/socket";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";
import { useModal } from "@/hooks/useModal";
import { FiLoader } from "react-icons/fi";
import { BsExclamationDiamond } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { format } from "date-fns";
import { GoPencil } from "react-icons/go";
import { useUpdateTodoMutation } from "../../../redux/features/apiSlice";


type TodoFormData = {
  _id?: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate: Date;
};

type Props = {
  setOpen: (open: any) => void;
  tasks: any;
};

const EditTodoForm: React.FC<Props> = ({ setOpen, tasks: task }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: task,
  });
  const dispatch = useDispatch()
  const {setOpen:setAuthModal} = useModal()
  const [updateTodo, { isSuccess, error }] = useUpdateTodoMutation();
  
  useEffect(() => {
    if(error){
      dispatch(userLoggedOut())
      setAuthModal(true)
    }
  }, [error])

  useEffect(() => {
    reset(task);
  }, [task, reset]);

  const onSubmit = async (data: TodoFormData) => {
    try {
      const newData = { ...data, _id: task._id };
      await updateTodo({ ...newData }).unwrap();
      socketId.emit("todos", {data: "todo updated"})
      setOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-3">
      <p className="text-lg uppercase font-[600]">EDIT TASK</p>

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
          defaultValue={''}
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


      <button type="submit" className={`bg-black text-white mt-4 rounded-lg py-2`}>
        Update Task
      </button>
    </form>
  );
};

export default EditTodoForm;
