import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pkg from "../../../../package.json";
import Cookies from "js-cookie";


const ForgotPass = createApi({
    reducerPath: "ForgotPass",
    baseQuery: fetchBaseQuery({
        baseUrl: `${pkg.baseUrl}`,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (builder) => ({

        ////////////////////////////  send Otp //////////////////////////////////

        forgotPasswordSendOTp: builder.mutation({
            query: (phone) => ({
                url: `/user/userExistAndSendOtp`,
                method: "POST",
                body: phone,
            }),
        }),

        /////////////////////////////  Change Password //////////////////////////

        forgotPasswordChangePassword: builder.mutation({
            query: ({ phone, newPassword }) => ({
                url: `/user/forgot-password`,
                method: "POST",
                body: {
                    phone,
                    newPassword
                },
            }),
        }),
    })
})

export const { useForgotPasswordSendOTpMutation , useForgotPasswordChangePasswordMutation } = ForgotPass
export default ForgotPass