import { CreateUserAction, UserAction, UserActionDisplay } from "@careminder/shared/types";

import { api } from "./index";

export const tasksApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        getUserActions: builder.query<UserActionDisplay[], void>({
            query: () => {
                return "/actions/user";
            },
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
    }),
});

export const {
    useGetUserActionsQuery,
    useDeleteUserActionMutation,
    useCreateUserActionMutation,
} = tasksApiSlice;
