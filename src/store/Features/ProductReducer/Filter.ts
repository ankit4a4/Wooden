import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import pkg from "../../../../package.json";
import Cookies from "js-cookie";
import axios from "axios";

// Define types for the product and API response
interface Product {
  _id: string;
  productCode: string;
  name: string;
  categoryId: string;
  publish: boolean;
  variantCount: number;
  totalQuantity: number;
  mrp: string | null;
  variants: any[];
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

interface FilterResponse {
  status: string;
  message: string;
  allProduct: Product[];
  pagination: Pagination;
  totalProducts: number;
  totalPublishedProducts: number;
  totalUnpublishedProducts: number;
}

interface FilterState {
  data: FilterResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  data: null,
  loading: false,
  error: null,
};

// AsyncThunk to fetch filtered products
export const getFilterData = createAsyncThunk(
  "filter/getFilter",
  async ({
    colorParam,
    subParam,
    lowPrice,
    highPrice
  }: {
    colorParam: string;
    subParam: string;
    lowPrice: number;
    highPrice: number;
  }) => {
    const token = Cookies.get("token");
    const response = await axios.get<FilterResponse>(
      `${pkg.baseUrl}/product/getAllProductAccToFilter`,
      {
        params: {
          color: colorParam,
          subCat: subParam,
          lowPrice,
          highPrice: highPrice,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearFilterData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFilterData.fulfilled,
        (state, action: PayloadAction<FilterResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getFilterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});
export const { clearFilterData } = FilterSlice.actions;
export default FilterSlice.reducer;
