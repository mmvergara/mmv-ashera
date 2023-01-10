import * as yup from "yup";

const emailValidation = yup.string().email("Enter a valid email").required("Email is required.");
const passwordValidation = yup
  .string()
  .min(6, "Password Minimum of 6 characters")
  .trim()
  .required("Password field is required.");

export const SignUP_ValSchema = yup.object({
  SignUpEmail: emailValidation,
  SignUpPassword: passwordValidation,
  SignUpUsername: yup
    .string()
    .min(6, "Username Minimum of 6 characters")
    .trim()
    .required("Username field is required."),
});

export const SignIN_ValSchema = yup.object({
  SignInEmail: emailValidation,
  SignInPassword: passwordValidation,
});
