"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Loader from "../../utils/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../../utils/Modal/CustomModal";
import { socketId } from "../../utils/socket";
import { useDrawer } from "@/contexts/DrawerContext";
import {
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../../../redux/features/apiSlice";
import TodoModal from "./TodoModal";
import DroppableColumn from "./DroppableColumn";
import AddTodoForm from "./AddTodoForm";
import { useProjects } from "@/contexts/ProjectContext";

type Props = {};

const TodosBoard = (props: Props) => {
  const {currentProject} = useProjects();
  const { isDrawerOpen, setDrawerOpen } = useDrawer();
  const {
    data: todos,
    isSuccess,
    isLoading: getTodosLoad,
    refetch,
  } = useGetTodosQuery({_id: currentProject.id}, { refetchOnMountOrArgChange: true });

  const [updateTask, { isSuccess: isTodoUpdated, isError, isLoading }] =
    useUpdateTodoMutation();
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState<any>();
  const { open, setOpen } = useModal();
  const [add, setAdd] = useState<boolean>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);
  useEffect(() => {
    if (isSuccess && todos) {
      setBoardData(todos);
    }
  }, [isSuccess, todos]);
  useEffect(() => {
    if (isError) {
      setOpen(true);
    }
  }, [isTodoUpdated, isError]);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { destination, draggableId } = result;
    const taskIndex = boardData.findIndex(
      (task: any) => task._id === draggableId
    );
    if (taskIndex === -1) return;
    const updatedTask = {
      ...boardData[taskIndex],
      status: destination.droppableId,
    };
    const newBoardData = Array.from(boardData);
    newBoardData.splice(taskIndex, 1);
    newBoardData.splice(destination.index, 0, updatedTask);
    setBoardData(newBoardData);
    await updateTask(updatedTask);
    socketId.emit("todos", { data: "todo status updated" });
  };

  useEffect(() => {
    socketId.on("onTodoUpdate", () => {
      refetch();
    });
    return () => {
      socketId.off();
    };
  });

  if (getTodosLoad) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col font-Poppins bg-white mt-4 rounded-lg">
      {isDrawerOpen !== "" && <TodoModal />}
      {isLoading && <Loader />}
      {ready && boardData && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 min-h-[38rem] pr-4">
            <DroppableColumn
              droppableId="To do"
              tasks={boardData}
              title="To do"
              setAdd={setAdd}
            />
            <DroppableColumn
              droppableId="In progress"
              tasks={boardData}
              title="In progress"
            />
            <DroppableColumn
              droppableId="Under review"
              tasks={boardData}
              title="Under review"
            />
            <DroppableColumn
              droppableId="Finished"
              tasks={boardData}
              title="Finished"
            />
          </div>
        </DragDropContext>
      )}
      {add && (
        <CustomModal
          open={add}
          setOpen={setAdd}
          setRoute={() => {}}
          component={AddTodoForm}
        />
      )}
    </div>
  );
};

export default TodosBoard;
