import { CreateUserAction, UserAction, UserActionDisplay } from "@careminder/shared/types";

import { api } from "./index";

export const tasksApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        getUserActions: builder.query<UserActionDisplay[], { start: number, end: number }>({
            query: ({ start, end }) => ({
                url: `/actions/user?start=${start}&end=${end}`,
            }),
            providesTags: ["actions"],
        }),
        createUserAction: builder.mutation<UserAction, CreateUserAction>({
            query: (body) => ({
                url: "/actions/user",
                method: "POST",
                body,
            }),
            invalidatesTags: ["actions"]
        }),
        deleteUserAction: builder.mutation<void, number>({
            query: (id) => ({
                url: `/actions/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["actions"]
        }),
        updateUserAction: builder.mutation<UserAction, Partial<UserAction>>({
            query: ({ id, ...body}) => ({
                url: `/actions/user/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["actions"]
        }),
    }),
});

export const {
    useGetUserActionsQuery,
    useDeleteUserActionMutation,
    useCreateUserActionMutation,
    useUpdateUserActionMutation,
} = tasksApiSlice;
