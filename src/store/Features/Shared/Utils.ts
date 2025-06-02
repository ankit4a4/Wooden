import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
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

interface CheckOutItem {
    productId: string;
    productVariantId: string;
    quantity: number;
}

interface UtilState {
    open: boolean;
    login: boolean;
    cart: boolean;
    address: Address | null;
    checkout: CheckOutItem | null;
}

// Utility function to safely parse localStorage values
const loadFromLocalStorage = (key: string, defaultValue: any) => {
    const item = localStorage?.getItem(key);
    return item ? JSON?.parse(item) : defaultValue;
};

const initialState: UtilState = {
    open: loadFromLocalStorage("open", false), 
    address: loadFromLocalStorage("address", null), 
    checkout: loadFromLocalStorage("checkout", null),
    login: false,
    cart: false
};

const utilSlice = createSlice({
    name: "util",
    initialState,
    reducers: {
        setIsOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload;
            localStorage.setItem("open", JSON.stringify(action.payload)); // Store as JSON
        },
        setAddress(state, action: PayloadAction<Address>) {
            state.address = action.payload;
            localStorage.setItem("address", JSON.stringify(action.payload)); // Save to localStorage
        },
        setCheckoutItem(state, action: PayloadAction<CheckOutItem>) {
            state.checkout = action.payload;
            localStorage.setItem("checkout", JSON.stringify(action.payload)); // Save to localStorage
        },
        setIsLogin(state, action: PayloadAction<boolean>){
            state.login = action.payload
        },
        setIsCart(state, action: PayloadAction<boolean>){
            state.cart = action.payload
        },
        clearCheckoutItem(state) {
            state.checkout = null;
            localStorage.removeItem("checkout");
        },
        clearAddress(state) {
            state.address = null;
            localStorage.removeItem("address");
        },
        clearIsOpen(state) {
            state.open = false;
            localStorage.removeItem("open");
        },
    },
});

export const {
    setIsOpen,
    setAddress,
    setCheckoutItem,
    clearCheckoutItem,
    clearAddress,
    setIsLogin,
    setIsCart,
    clearIsOpen
} = utilSlice.actions;

export default utilSlice.reducer;
