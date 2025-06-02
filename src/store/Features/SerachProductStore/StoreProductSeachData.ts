import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductVariant {
  imgObject: { url: string };
  price: number;
}

interface Product {
  _id: string;
  name: string;
  variants: ProductVariant[];
}

interface SearchProductState {
  StoreProductSlice: Product[];
}

const initialState: SearchProductState = {
  StoreProductSlice: [],
};

const StoreProductSlice = createSlice({
  name: "storeProduct",
  initialState,
  reducers: {
    setStoreProduct: (state, action: PayloadAction<Product[]>) => {
      state.StoreProductSlice = action.payload;
    },
    clearStoreProduct: (state) => {
      state.StoreProductSlice = [];
    },
  },
});

export const { setStoreProduct, clearStoreProduct } = StoreProductSlice.actions;

export default StoreProductSlice.reducer;
