import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
    showCart: false,
    notification: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;