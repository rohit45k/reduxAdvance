import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from './store/uiSlice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let initialRender = true

function App() {

  const showCart = useSelector(state => state.ui.showCart)
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch()

  const sendCartData = useCallback(async() => {

    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data'
    }))

    const response = await fetch("https://redux-store-97f56-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
      method: 'PUT',
      body: JSON.stringify(cart)
    })

    if(!response.ok) {
      throw new Error('Sending data failed')
    }

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success',
      message: 'Sent cart data successfully'
    }))
  }, [cart, dispatch])

  useEffect(() => {
    if(initialRender) {
      initialRender = false;
      return
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error...',
        message: 'Something went wrong'
      }))
    })
  }, [sendCartData, dispatch])

  return (
    <>
    {notification && <Notification {...notification}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
