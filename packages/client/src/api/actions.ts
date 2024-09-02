import { Action } from "@careminder/shared/types";

import { api } from "./index";

export const tasksApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        getActions: builder.query<Action[], void>({
            query: () => {
                return "/actions";
            },
            providesTags: ["actions"],
        }),
    }),
});

export const {
    useGetActionsQuery,
} = tasksApiSlice;
