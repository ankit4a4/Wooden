import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pkg from "../../../../package.json";
import Cookies from "js-cookie";

const GalleryReducer = createApi({
    reducerPath: "GalleryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${pkg.baseUrl}`,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getGallery: builder.query({
            query: ({page}) => ({
                method: "GET",
                url: `/gallery/getallgallery/?page=${page}&limit=8`,
            })
        })
    }),
});

export const { useGetGalleryQuery } = GalleryReducer
export default GalleryReducer