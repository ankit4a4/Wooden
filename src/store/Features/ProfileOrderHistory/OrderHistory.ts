import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pkg from "../../../../package.json";
import Cookie from "js-cookie";

interface Review {
  star: string;
  comment: string;
}

interface AddReviewResponse {
  star: string;
  comment: string;
}

interface ReturnOrderResponse {
  status: string;
  message: string;
  data: {
    _id: string;
    returnMessage: string;
    user: string;
    paid: boolean;
    accepted: boolean;
    rejected: boolean;
    images: string[];
    product: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// Update the API to accept pagination parameters
export const OrderHistoryApi = createApi({
  reducerPath: "history",
  baseQuery: fetchBaseQuery({
    baseUrl: pkg.baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrderHistory: builder.query({
      query: ({ page, perPage }) => ({
        url: `/user/get-all-order?page=${page}&perPage=${perPage}`,
        method: "GET",
      }),
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `user/get-single-order/${id}`,
        method: "GET",
      })
    }),
    addReview: builder.mutation<AddReviewResponse, { id: string; review: Review }>({
      query: ({ id, review }) => ({
        url: `user/addReview/${id}`,
        method: "POST",
        body: review,
      }),
    }),
    returnOrder: builder.mutation<ReturnOrderResponse, { orderId: string; formData: FormData }>({
      query: ({ orderId, formData }) => ({
        url: `/user/return-order/${orderId}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetOrderHistoryQuery, useAddReviewMutation, useReturnOrderMutation, useGetSingleOrderQuery } = OrderHistoryApi;
export default OrderHistoryApi;
