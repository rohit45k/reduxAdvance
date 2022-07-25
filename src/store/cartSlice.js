import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    badgeQty: 0,
    totalAmount: 0,
    isChanged: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            const item = action.payload;

            const itemExists = state.items.find(i => i.id === item.id);

            state.isChanged = true
            if(!itemExists) {
                state.items.push({
                    id: item.id,
                    name: item.name,
                    quantity: 1,
                    price: item.price,
                    totalAmount: item.price
                })
            } else {
                itemExists.quantity += 1
                itemExists.totalAmount += itemExists.price
            }

            state.badgeQty += 1
            state.totalAmount +=  item.price

        },
        removeItemFromCart(state, action) {
            const id = action.payload;

            const itemExists = state.items.find(item => item.id === id);

            if(!itemExists) {
                return
            }

            state.isChanged = true
            if(itemExists.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                itemExists.quantity -= 1
                itemExists.totalAmount -= itemExists.price
            }

            state.badgeQty -= 1
            state.totalAmount -=  itemExists.price

        },
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.badgeQty = action.payload.badgeQty;
            state.totalAmount = action.payload.totalAmount
        },
        clearCart(state) {
            state = initialCartState
        },
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer