import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import pkg from "../../../../package.json";

const UserReducer = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${pkg.baseUrl}`,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User"],

  endpoints: (build) => ({
    /////////////////////////// get user ///////////////////////////

    GetUser: build.query({
      query: () => ({
        url: "/user/getSingalUser",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    /////////////////////////// name update ///////////////////////////

    updateUserName: build.mutation({
      query: ({ firstName, lastName }) => ({
        url: "/user/updateUser",
        method: "PUT",
        body: {
          firstName,
          lastName,
        },
      }),
      invalidatesTags: ["User"],
    }),

    /////////////////////////// email update ///////////////////////////
    updateEmail: build.mutation({
      query: ({email}) => ({
        url: "/user/updateEmail",
        method: "PUT",
        body: {email},
      }),
      invalidatesTags: ["User"],
    }),

    /////////////////////////// phone update ///////////////////////////

    updateNumber: build.mutation({
      query: ({ phone }) => ({
        url: "/user/updatePhone",
        method: "PUT",
        body: {
          phone,
        },
      }),
      invalidatesTags: ["User"],
    }),

    //////////////////////////  Password update ///////////////////////////

    updatePassWord: build.mutation({
      query: ({ password }) => ({
        url: "/user/updatePassword",
        method: "PUT",
        body: {
          password,
        },
      }),
      invalidatesTags: ["User"],
    }),


    /// password verification mutation
    verifyPassword: build.mutation({
      query:({password}) => ({
        url: "/user/passwordVerify",
        method:"POST",
        body: {password},
      })
    })
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserNameMutation,
  useUpdateEmailMutation,
  useUpdateNumberMutation,
  useUpdatePassWordMutation,
  useVerifyPasswordMutation
} = UserReducer;
export default UserReducer;
