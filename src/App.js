import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { sendCartData, fetchCartData } from './store/cart-actions';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let initialRender = true

function App() {

  const showCart = useSelector(state => state.ui.showCart)
  const cart = useSelector(state => state.cart)
  const isChanged = useSelector(state => state.cart.isChanged)
  const notification = useSelector(state => state.ui.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if(initialRender) {
      initialRender = false;
      return
    }
    if(isChanged) {
      dispatch(sendCartData({
        items: cart.items,
        badgeQty: cart.badgeQty,
        totalAmount: cart.totalAmount,
      }))
    }
  }, [cart, dispatch, isChanged])

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
