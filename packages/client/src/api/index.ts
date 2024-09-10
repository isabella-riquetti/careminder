import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const staggeredBaseQueryWithBailOut = retry(
    fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: async (headers) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const token = await (window as any).Clerk?.session.getToken();
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
        responseHandler: async response => {
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
                return await response.json();
            } else {
                return await response.text();
            }
        },
    }),
);

export const api = createApi({
    baseQuery: staggeredBaseQueryWithBailOut,
    refetchOnFocus: false,
    reducerPath: "api",
    tagTypes: ["actions", "userActions"],
    endpoints: () => ({}),
});
