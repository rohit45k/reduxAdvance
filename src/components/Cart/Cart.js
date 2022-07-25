import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {

  const cartItems = useSelector(state => state.cart.items)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  let cartEl = null;

  if(cartItems.length > 0) {
    cartEl = cartItems.map(item => (
      <CartItem key={item.id} item={item}/>
    ))
  } else {
    cartEl = <p>Your Cart is Empty</p>
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
       {cartEl}
      </ul>
      <h3>Total Amount &nbsp; ${totalAmount}</h3>
    </Card>
  );
};

export default Cart;
