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

    exportProject: builder.mutation({
      query: (project) => ({
        url: "project-service/projects/export",
        method: "POST",
        credentials: "include" as const,
        body: project,
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `${project.title}.md`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          return { data: 'Export successful' };
        },
      }),
    }),
  }),
});

export const {
  useAddProjectMutation,
  useUpdateProjectMutation,
  useGetProjectsQuery,
  useExportProjectMutation
} = projectApi;
