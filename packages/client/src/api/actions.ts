import { Action } from "@careminder/shared/types";

import { api } from "./index";

export const tasksApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        getActions: builder.query<Action[], void>({
            query: () => {
                return "/actions";
            },
        }),
        findAction: builder.query<Action, number>({
            query: (id) => {
                return `/actions/${id}`;
            },
        }),
        createAction: builder.mutation<Action, Partial<Action>>({
            query: (body) => ({
                url: "/actions",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGetActionsQuery,
    useFindActionQuery,
    useCreateActionMutation,
} = tasksApiSlice;
