import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pkg from "../../../../package.json";
import Cookies from "js-cookie";

interface Product {
    _id: string;
    name: string;
    categoryId: string;
    addedBy: string;
    detail: string;
    // Add other fields as necessary
}
interface Image {
    url: string,
    publicId: string,
    _id: string
}
interface ProductVariant {
    _id: string;
    productId: string;
    addedBy: string;
    mrp: string;
    quantity: number;
    imgObject: Image

}

interface AddWishListRequest {
    productId: string;
    variantId: string;
}

interface RemoveWishListResponse {
    success: boolean;
    message: string;
}

interface WishlistItem {
    _id: string;
    product: Product;
    productVariants: ProductVariant;
}

interface GetWishlistResponse {
    data: WishlistItem[];
}

const WishlistReducer = createApi({
    reducerPath: "WishlistApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${pkg.baseUrl}`,
        prepareHeaders: (Headers) => {
            const token = Cookies.get("token");

            if (token) {
                Headers.set("authorization", `Bearer ${token}`);
            }
            return Headers;
        },
    }),
    tagTypes: ["Wishlist"],
    endpoints: (build) => ({
        addWishList: build.mutation<RemoveWishListResponse, AddWishListRequest>(
            {
                query: ({ productId, variantId }) => ({
                    url: "/user/addtowishlist",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        productId,
                        variantId,
                    },
                }),
                invalidatesTags: ["Wishlist"],
            }
        ),
        getWishlist: build.query<GetWishlistResponse, void>({
            query: () => ({
                url: "/user/getwishlist",
                method: "GET",
            }),
            providesTags: ["Wishlist"],
        }),
        removeWishList: build.mutation<RemoveWishListResponse, string>({
            query: (id) => ({
                url: `/user/removeFromWishlist/${id}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            invalidatesTags: ["Wishlist"],
        }),
    }),
});

export const {
    useAddWishListMutation,
    useGetWishlistQuery,
    useRemoveWishListMutation,
} = WishlistReducer;

export default WishlistReducer;
