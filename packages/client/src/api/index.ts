import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { toast } from 'react-toastify';

const staggeredBaseQueryWithBailOut = retry(
    async (args, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({
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
        });
        
        const result = await baseQuery(args, api, extraOptions);

        if (result.error) {
            if (result.error.status === 429) {
                toast.warn('Free users are only allowed to add 5 reminders every 10 minutes. Please try again later.', {
                    autoClose: false,
                });
            }
            if (result.error && result.error.status !== 500) {
                retry.fail(result.error);
                
            }
        }

        return result;
    },
    { maxRetries: 3 }
);

export const api = createApi({
    baseQuery: staggeredBaseQueryWithBailOut,
    refetchOnFocus: false,
    reducerPath: "api",
    tagTypes: ["actions", "userActions"],
    endpoints: () => ({}),
});
