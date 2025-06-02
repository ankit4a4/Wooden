import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import pkg from "../../../../package.json";


const ReviewReducer = createApi({
    reducerPath: "ReviewApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${pkg.baseUrl}`,
        prepareHeaders: (headers) => {
            const token = Cookie.get("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Review"],
    endpoints: (build) => ({
        getReview: build.query({
            query: ({ id }) => ({
                url: `/user/getAllReviewOfAProductVariant/${id}`,
                method: "GET",
            }),
            providesTags: ["Review"],
        }),
    }),
});

export const { useGetReviewQuery } = ReviewReducer
export default ReviewReducer
