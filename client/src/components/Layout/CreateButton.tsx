"use client"
import { useDrawer } from "@/contexts/DrawerContext";
import { styles } from "@/styles/style";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

type Props = {
  text: string
};

const CreateButton = ({text}: Props) => {
  const { isDrawerOpen, setDrawerOpen } = useDrawer();
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
        onClick={() => setDrawerOpen("To do")}
      >
        {text} <AiFillPlusCircle className="h-6 w-6"/>
      </button>
    </div>
  );
};

export default CreateButton;
