"use cliennt";
import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { BiMenuAltLeft } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { useDrawer } from "@/contexts/DrawerContext";
import CardItem from "./CardItem";

type Props = {
  droppableId: string;
  tasks: any;
  title: string;
  setAdd?: any;
};

const DroppableColumn = ({ droppableId, tasks, title, setAdd }: Props) => {
  const filteredTasks = tasks.filter(
    (task: any) => task.status === droppableId
  );

  const {isDrawerOpen, setDrawerOpen} = useDrawer()
  return (
    <>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`bg-white rounded-md flex flex-col relative overflow-hidden pl-4 pt-3 ${
              snapshot.isDraggingOver ? "bg-green-100" : ""
            }`}
          >
            <span className="w-full h-1 absolute inset-x-0 top-0"></span>
            <h4 className="flex justify-between items-center mb-2">
              <span className="text-xl text-[#555555] font-[300] tracking-wide font-Barlow">
                {title}
              </span>
              <BiMenuAltLeft className="w-6 h-6 text-[#555555]" />
            </h4>
            <div
              className="overflow-y-auto overflow-x-hidden h-auto"
              style={{ maxHeight: "calc(100vh - 290px)" }}
            >
              {filteredTasks.map((item: any, index: number) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardItem data={item} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
              <button
                className="flex justify-between bg-custom-gradient rounded-lg tracking-wide hover:shadow-2xl hover:opacity-90  items-center px-2  py-2 my-3 space-x-2 font-[300] text-[#E3E1E1] text-sm"
                onClick={() => {
                  setDrawerOpen(droppableId)
                }}
              >
                  <span >Add new </span>
                  <FiPlus className="w-5 h-5" strokeWidth={1.5} />
              </button>
          </div>
        )}
      </Droppable>
    </>
  );
};

export default DroppableColumn;
