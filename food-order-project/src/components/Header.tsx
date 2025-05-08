import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from '../shared/Button';

import CartContext from '../store/cartContext';
import UserProgressContext from '../store/UserProgressContext.tsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="A restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems.toString()})
                </Button>
            </nav>
        </header>
    );
}