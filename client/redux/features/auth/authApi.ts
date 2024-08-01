import { apiSlice } from "../apiSlice";
import { userLoggedOut } from "./authSlice";

type RegistrationResponse = {
  message: string;
  data: {
    token: string;
  };
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "auth-service/auth/users",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth-service/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "auth-service/auth/logout",
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          dispatch(userLoggedOut());
          console.error("Error during logout:", error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogOutMutation } =
  authApi;
