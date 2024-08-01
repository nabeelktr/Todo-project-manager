import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthSchema } from "../../utils/yup";
import { styles } from "../../styles/style";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function SignUp({ setRoute }: any) {
  const [show, setshow] = useState(false);
  const [register, { isSuccess, error }] = useRegisterMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successful");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: AuthSchema,
    onSubmit: async ({ email, password, name }) => {
      await register({ email, password, name }).unwrap();
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className={" w-full justify-center items-center flex   text-black"}>
      <div className=" text-black bg-white w-[45%] mt-[60px] rounded-[16px] border-[#CECECE] border p-[50px] flex flex-col gap-[30px]">
        <h1 className={`text-4xl text-center font-Barlow font-[600]`}>
          Welcome to <span className="text-[#4534AC]">Workflo </span>!
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Full name"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            } `}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-1 text-sm block">
              {errors.name}
            </span>
          )}
          <div className="w-full mt-5 relative">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="Your email"
              className={`${
                errors.email && touched.email && "border-red-500 "
              } ${styles.input} `}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-1 text-sm block">
                {errors.email}
              </span>
            )}
          </div>

          <div className="w-full mt-5 relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="Password"
              className={`${
                errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
            />
            {!show ? (
              <VscEyeClosed
                size={20}
                className="z-1 absolute bottom-3.5 right-2.5 cursor-pointer text-[#999999]"
                onClick={() => setshow(true)}
              />
            ) : (
              <VscEye
                size={20}
                className="z-1 absolute bottom-3.5 right-2.5 cursor-pointer text-[#999999]"
                onClick={() => setshow(false)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-1 text-sm block">
              {errors.password}
            </span>
          )}

          <div className="mt-5 w-full">
            <input
              type="submit"
              value={"Sign up"}
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
              className={`${styles.button} hover:shadow-4xl`}
            />
          </div>
          <h5 className="mt-[30px] text-center text-[17px] text-[#606060] font-[300]">
            Already have an account?
            <span
              className="cursor-pointer pl-1 text-[#0054A1]"
              onClick={() => setRoute("Login")}
            >
              Log in
            </span>
          </h5>
        </form>
      </div>
    </div>
  );
}
