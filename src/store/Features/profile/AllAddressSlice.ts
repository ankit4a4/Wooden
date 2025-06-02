import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import pkg from "../../../../package.json";

export interface Address {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  selected: boolean;
  __v: number;
}

// Define type for the response of getAddresses
export interface GetAddressesResponse {
  data: Address[];
  totalAddresses: number; // Total number of addresses
  totalPages: number; // Total number of pages
}

const getTokenValue = () => {
  return Cookie.get("token");
};

export const AllAddressSlice = createApi({
  reducerPath: "allAddress",
  baseQuery: fetchBaseQuery({
    baseUrl: pkg.baseUrl,
    prepareHeaders: (headers) => {
      const token = getTokenValue();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["address"],
  endpoints: (builder) => ({
    getAddresses: builder.query<GetAddressesResponse, { page: number; perPage: number }>({
      query: ({ page, perPage }) => ({
        url: `/user/all-address?page=${page}&perPage=${perPage}`,
        method: "GET",
        params: { page, perPage }, // Pass pagination parameters
      }),
      providesTags: ["address"],
    }),
    deleteAllAddresses: builder.mutation<void, string>({
      query: (id) => ({
        url: `user/delete-address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["address"],
    }),
    updateAddress: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `user/update-address/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["address"],
    }),
  }),
});

export const { useGetAddressesQuery, useDeleteAllAddressesMutation, useUpdateAddressMutation } = AllAddressSlice;
export default AllAddressSlice;
