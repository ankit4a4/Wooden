import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import LoginReducer from "./Features/LoginReducer/LoginReducer";
import ProductReducer from "./Features/ProductReducer/ProductReducer";
import wishlistSlice from "./Features/WishlistReducer/WishlistStore";
import WishlistReducer from "./Features/WishlistReducer/WishlistReducer";
import CartSlice from "./Features/Cart/CartSlice";
import UtilSlice from "./Features/Shared/Utils";
import OrderHistoryApiReducer from "./Features/ProfileOrderHistory/OrderHistory";
import AllAddressSlice from "./Features/profile/AllAddressSlice";
import searchProductSlice from "./Features/SerachProductStore/SearchProductStore";
import StoreProductSlice from "./Features/SerachProductStore/StoreProductSeachData";
import UserReducer from "./Features/user/UserReducer";
import contactApiReducer from "./Features/ContactUs/ContactUs";
import ReviewReducer from "./Features/ReviewReducer/ReviewReducer";
import buyNowReducer from "./Features/BuyNow/BuynowSlice";
import FilterSlice from "./Features/ProductReducer/Filter";
import GalleryReducer from "./Features/gallery/GalleryReducer";
import ForgotPass from "./Features/ForgotPassword/ForgotPass";

const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    cart: CartSlice,
    util: UtilSlice,
    searchProduct: searchProductSlice,
    storeProduct: StoreProductSlice,
    filter: FilterSlice,
    [LoginReducer.reducerPath]: LoginReducer.reducer,
    [ProductReducer.reducerPath]: ProductReducer.reducer,
    [WishlistReducer.reducerPath]: WishlistReducer.reducer,
    [AllAddressSlice.reducerPath]: AllAddressSlice.reducer,
    [UserReducer.reducerPath]: UserReducer.reducer,
    [contactApiReducer.reducerPath]: contactApiReducer.reducer,
    [ReviewReducer.reducerPath]: ReviewReducer.reducer,
    [OrderHistoryApiReducer.reducerPath]: OrderHistoryApiReducer.reducer,
    [buyNowReducer.reducerPath]: buyNowReducer.reducer,
    [GalleryReducer.reducerPath]: GalleryReducer.reducer,
    [ForgotPass.reducerPath]: ForgotPass.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      LoginReducer.middleware,
      ProductReducer.middleware,
      WishlistReducer.middleware,
      AllAddressSlice.middleware,
      UserReducer.middleware,
      contactApiReducer.middleware,
      ReviewReducer.middleware,
      OrderHistoryApiReducer.middleware,
      buyNowReducer.middleware,
      GalleryReducer.middleware,
      ForgotPass.middleware
    ),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
