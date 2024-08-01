import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http:localhost:3001/api/v1/",
    // baseUrl: "http://ec2-3-84-135-13.compute-1.amazonaws.com:3001/api/v1/",
  }),
  endpoints: (builder) => ({

    updateTodo: builder.mutation({
      query: (data) => ({
        url: `task-service/tasks/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    deleteTodo: builder.mutation({
      query: (data) => ({
        url: `task-service/tasks/${data._id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    getTodos: builder.query({
      query: () => ({
        url: "task-service/tasks",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addTodo: builder.mutation({
      query: (data) => ({
        url: "task-service/tasks",
        method: "POST",
        credentials: "include" as const,
        body: data,
      }),
    }),

  }),
});

export const {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation
} = apiSlice;
