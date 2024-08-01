import { apiSlice } from "../apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProject: builder.mutation({
      query: (data) => ({
        url: `project-service/projects/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getProjects: builder.query({
      query: () => ({
        url: "project-service/projects",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addProject: builder.mutation({
      query: (data) => ({
        url: "project-service/projects",
        method: "POST",
        credentials: "include" as const,
        body: data,
      }),
    }),
  }),
});

export const {
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetProjectsQuery,
} = projectApi;
