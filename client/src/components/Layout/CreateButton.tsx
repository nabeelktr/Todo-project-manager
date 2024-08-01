"use client"
import { styles } from "@/styles/style";
import CustomModal from "@/utils/Modal/CustomModal";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import ProjectForm from "../Projects/AddAndEditProject";

type Props = {
  text: string
};

const CreateButton = ({text}: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className=" w-full">
      <button
        style={{
          background:
            "linear-gradient(180deg, #4C38C2 0%, #2F2188 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(360deg, #4B36CC 0%, #9C93D4 107.69%)",
          borderImageSlice: 1,
          boxShadow:
            "0px 4px 16px 0px #0000001A, 0px 12px 16px 0px #BABABA33 inset",
        }}
        className={`${styles.button} hover:shadow-4xl flex gap-2 items-center justify-center px-2 `}
        onClick={() => setOpen(true)}
      >
        {text} <AiFillPlusCircle className="h-6 w-6"/>
      </button>
      {open && (
        <CustomModal open={open} setOpen={setOpen} setRoute={() => {}} component={ProjectForm}  />
      )}
    </div>
  );
};

export default CreateButton;
