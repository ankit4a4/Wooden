import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Update the WishlistState to store the whole item
interface WishlistState {
    items: void[];
}

const loadWishlistFromLocalStorage = (): WishlistState => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : { items: [] };
};

const initialState: WishlistState = loadWishlistFromLocalStorage();

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist(state, action: PayloadAction<void>) {
            const item = action.payload;
            state.items.push(item);
            localStorage.setItem('wishlist', JSON.stringify(state));
        },
    },
});

export const { addToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
