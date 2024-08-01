import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

export const AuthSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Requires a combination of uppercase and lowercase letters.",
    })
    .matches(passwordNumberRule, { message: "At least one number (0-9)." })
    .required("Please enter your password"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Requires a combination of uppercase and lowercase letters.",
    })
    .matches(passwordNumberRule, { message: "At least one number (0-9)." })
    .required("Please enter your password"),
});

export const taskSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  description: Yup.string().trim(),
  priority: Yup.string()
    .required("Priority is required")
    .oneOf(["Low", "Medium", "Urgent"], "Invalid priority"),
  status: Yup.string()
    .required("status is required")
    .oneOf(
      ["To do", "In progress", "Under review", "Finished"],
      "Invalid priority"
    ),
  dueDate: Yup.date()
    .required("Due date is required")
    .min(new Date(), "Due date cannot be in the past"),
});
