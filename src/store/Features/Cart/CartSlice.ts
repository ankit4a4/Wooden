import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import pkg from "../../../../package.json";

interface CartItem {
  _id: string;
  productVariantId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  data: never[];
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

interface AddToCartItem {
  productId: string;
  productVariantId: string;
  quantity: number;
  image: string;
  price: number;
  name: string;
}

type CartResponse = CartItem[] | { data: CartItem[] };

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item: AddToCartItem) => {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.post(
        `${pkg.baseUrl}/user/addtocart`,
        {
          productId: item.productId,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } else {
      const currentCart: CartItem[] = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      );
      const existingItemIndex = currentCart.findIndex(
        (cartItem) => cartItem.productVariantId === item.productVariantId
      );

      if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity += item.quantity;
      } else {
        const newItem: CartItem = {
          _id: item.productId,
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image,
          data: [],
        };
        currentCart.push(newItem);
      }

      localStorage.setItem("guestCart", JSON.stringify(currentCart));
      return currentCart;
    }
  }
);

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const token = Cookies.get("token");
  if (token) {
    const response = await axios.get(`${pkg.baseUrl}/user/getCart`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response?.data;
  } else {
    return JSON.parse(localStorage.getItem("guestCart") || "[]");
  }
});

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { itemId, action }: { itemId: string; action: "increase" | "decrease" },
    { dispatch }
  ) => {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.post(
        `${pkg.baseUrl}/user/cartQuantityUpdate`,
        { cartId: itemId, action },
        { headers: { authorization: `Bearer ${token}` } }
      );
      dispatch(getCart());
      return response.data;
    } else {
      const currentCart: CartItem[] = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      );
      const updatedCart = currentCart.map((item) =>
        item.productVariantId === itemId
          ? {
            ...item,
            quantity:
              action === "increase"
                ? item?.quantity + 1
                : Math.max(1, item?.quantity - 1),
          }
          : item
      );

      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      return updatedCart;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId: string, { dispatch }) => {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.delete(
        `${pkg.baseUrl}/user/removeFromCart/${itemId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      dispatch(getCart());
      return response.data;
    } else {
      const currentCart: CartItem[] = JSON.parse(
        localStorage.getItem("guestCart") || "[]"
      );
      const updatedCart = currentCart.filter((item) => item?._id !== itemId);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      return updatedCart;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          state.items = Array.isArray(action.payload)
            ? action.payload
            : action.payload.data; 
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          state.items = Array.isArray(action.payload)
            ? action.payload
            : action.payload.data; // This will be valid now
        }
      )
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(
        updateQuantity.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.items = action.payload;
        }
      )  
  },
});

export default cartSlice.reducer;
