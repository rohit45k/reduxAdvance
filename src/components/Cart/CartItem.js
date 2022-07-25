import { useDispatch } from 'react-redux/es/exports';

import { cartActions } from '../../store/cartSlice';
import classes from './CartItem.module.css';

const CartItem = ({item}) => {

  const dispatch = useDispatch();

  const {id, name, quantity, totalAmount, price } = item;

  const decreaseItemFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }

  const increaseItemFromCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      id,
      name,
      price,
    }))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${totalAmount.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseItemFromCartHandler}>-</button>
          <button onClick={increaseItemFromCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
