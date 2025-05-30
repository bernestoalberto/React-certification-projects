import { useContext, useRef } from 'react';

import CartModal from './CartModal';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

interface HeaderProps {
  cart: Cart;
  onUpdateCartItemQuantity: (id: string, amount: number) => void;
}

import { CartContext } from '../store/shopping-cart-context';

export default function Header() {
  const modal = useRef<HTMLDialogElement>(null);
  const { items } = useContext(CartContext);

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    if(modal && modal.current){
    modal.current.open();
    }
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
