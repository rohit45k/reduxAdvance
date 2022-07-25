import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data'
          }))

        const sendData = async() => {
            const response = await fetch("https://redux-store-97f56-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
                method: 'PUT',
                body: JSON.stringify(cart)
            })

            if(!response.ok) {
                throw new Error('Sending data failed')
            }
        }

        try {
            await sendData()
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Sent cart data successfully'
              }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Something went wrong'
              }))
        }
    }
}

export const fetchCartData = () => {
    return async(dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Fetching...',
            message: 'Fetching cart data'
          }))

          const fetchCart = async() => {
            const response = await fetch("https://redux-store-97f56-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json")

            if(!response.ok) {
                throw new Error('Something went wrong')
            }

            const data = await response.json();
            return data;
          }

          try {
            const cartData = await fetchCart();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                badgeQty: cartData.badgeQty,
                totalAmount: cartData.totalAmount,
            }));
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Fetched cart data successfully'
              }))
          } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Something went wrong'
              }))
          }
    }
}