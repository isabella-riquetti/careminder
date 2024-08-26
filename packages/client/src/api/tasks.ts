import { api } from "./index";

export const tasksApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        get: builder.query<string, void>({
            query: () => {
                return "/";
            },
        }),
    }),
});

export const {
    useGetQuery,
} = tasksApiSlice;
