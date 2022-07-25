import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from "../../store/uiSlice"

import classes from './CartButton.module.css';

const CartButton = (props) => {

  const badgeQty = useSelector(state => state.cart.badgeQty)
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{badgeQty}</span>
    </button>
  );
};

export default CartButton;
