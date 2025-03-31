import { forwardRef, RefObject, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

interface CartModalProps {
  // cartItems: { id: string; name: string; price: number; quantity: number; }[];
  // onUpdateCartItemQuantity: (id: string, amount: number) => void;
  title: string;
  actions: React.ReactNode;
  ref: RefObject<HTMLDialogElement>
}

const CartModal = forwardRef<HTMLDialogElement, CartModalProps>(function Modal(
  { title, actions },
  ref
) {
  const dialog = useRef<any>(null);


  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (dialog && dialog.current) {
          dialog.current.showModal();
        }
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default CartModal;
