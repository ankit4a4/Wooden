import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pkg from "../../../../package.json";
import Cookies from "js-cookie";

const buyNowReducer = createApi({
  reducerPath: "BuyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${pkg.baseUrl}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    buyProduct: builder.mutation({
      query: (payload) => ({
        url: `/user/buy-product`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useBuyProductMutation } = buyNowReducer;

export default buyNowReducer;
