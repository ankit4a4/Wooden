// ProductReducer.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pkg from "../../../../package.json";
import Cookies from "js-cookie";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ImgObject {
  url: string;
}

interface Variant {
  imgObject: ImgObject[]; 
  mrp: number | string; 
}

export interface AllProducts {
  _id: string;
  name: string;
  variants: Variant[];
}

interface GetProductsResponse {
  products: Product[];
}



interface GetCategoryResponse {
  products: Product[];
  allProducts: AllProducts[];
  pagination: any
}

const ProductReducer = createApi({
  reducerPath: "ProductApi",
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
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: "/product/getAllProductWebsite",
        method: "GET",
      }),
    }),
    getCategory: builder.query<GetCategoryResponse, { type: string, page: number }>({
      query: ({ type, page }) => ({
        url: `/product/getAllProductWebsite?categoryType=${type}&page=${page}`,
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query<Product, { id: string }>({
      query: (id) => ({
        url: `/product/getsingleproduct/${id}`,
        method: "GET",
      }),
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "/product/getallcategory",
        method: "GET",
      }),
    }),
    getFilterSubCategory: builder.query({
      query: ({ sub }) => {
        return {
          url: `/product/getAllProductAccToFilter?subCat=${sub}`,
          method: "GET",
        };
      },
    }),

    SearchProduct: builder.query({
      query: ({ page, status }) => ({
        url: `/product/getSearchProduct?page=${page}&limit=2&search=${status} `,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoryQuery,
  useGetSingleProductQuery,
  useGetAllCategoryQuery,
  useSearchProductQuery,
  useGetFilterSubCategoryQuery,
} = ProductReducer;
export default ProductReducer;
