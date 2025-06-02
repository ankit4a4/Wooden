import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pkg from "../../../../package.json";
import Cookies from "js-cookie";
import { addToCart, getCart } from "../Cart/CartSlice";

interface AddToCartItem {
  productId: string;
  productVariantId: string;
  quantity: number;
  image: string;
  price: number;
  name: string;
}
interface LoginFormData {
  email: string;
  password: string;
}
interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const LoginReducer = createApi({
  reducerPath: "AdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${pkg.baseUrl}`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (formData) => ({
        url: "/user/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: formData.email,
          password: formData.password,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("token", data.token);

          // merge guest cart with user cart
          const guestCart = JSON.parse(
            localStorage.getItem("guestCart") || "[]"
          );

          if (guestCart?.length > 0) {
            try {
              for (const payload of guestCart) {
                const item: AddToCartItem = {
                  productId: payload?._id,
                  productVariantId: payload?.productVariantId,
                  quantity: payload?.quantity,
                  image: payload?.image,
                  price: payload?.price,
                  name: payload?.name,
                };
                await dispatch(addToCart(item));
              }
              localStorage.removeItem("guestCart");

              dispatch(getCart());

              // check for redirect
              const redirectPath = sessionStorage.getItem("redirectAfterLogin");
              if (redirectPath) {
                sessionStorage.removeItem("redirectAfterLogin");
                window.location.href = redirectPath;
              }
            } catch (error) {
              console.error("Error in merging cart ", error);
            }
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      },
    }),
   

    signUp: builder.mutation<void, SignUpFormData>({
      query: (formData) => ({
        url: "/user/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        },
      }),
    }),

    addContactUs: builder.mutation({
      query: (formData) => ({
        url: "/contact/addContact",
        method: "POST",
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      queryFn: () => {
        Cookies.remove("token"); 
        return { data: undefined }; 
      },
    }),
    
  }),
});

export const {useLogoutMutation, useLoginMutation, useSignUpMutation, useAddContactUsMutation } =
  LoginReducer;
export default LoginReducer;
