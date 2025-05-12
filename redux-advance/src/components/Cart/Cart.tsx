import { useSelector } from 'react-redux';
import Card from '../UI/Card.tsx';
import classes from './Cart.module.css';
import CartItem from './CartItem.tsx';
import { IProduct } from '../Shop/Products.tsx';

const Cart = (props) => {
  const showShoppingCart = useSelector((state) => state.ui.cartIsVisible);
  const cartItems = useSelector((state) => state.cart.items);
  return (
    (showShoppingCart &&
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems && cartItems.map((product: IProduct) => (
            <CartItem
              item={{ id: product.id, title: product.name, quantity: product.quantity, total: product.totalPrice, price: product.price }}
            />
          ))}
        </ul>
      </Card>
    )
  );
};

export default Cart;
