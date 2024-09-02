import { CreateUserAction, UserAction } from "@careminder/shared/types";

import { api } from "./index";

export const tasksApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        getUserActions: builder.query<UserAction[], void>({
            query: () => {
                return "/user/actions";
            },
            providesTags: ["actions"],
        }),
        createUserAction: builder.mutation<UserAction, CreateUserAction>({
            query: (body) => ({
                url: "/user/actions",
                method: "POST",
                body,
            }),
            invalidatesTags: ["actions"]
        }),
    }),
});

export const {
    useGetUserActionsQuery,
    useCreateUserActionMutation,
} = tasksApiSlice;
