import { forwardRef, useImperativeHandle, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import Button from './Button';

interface ModalProps {
    children: ReactNode;
    buttonCaption: string;
}

interface ModalHandle {
    open: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
        return {
            open() {
                if (dialog.current) {
                    dialog.current.showModal();
                }
            },
            close() {
                if (dialog.current) {
                    dialog.current.close();
                }
            },
        };
    });

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        throw new Error('Modal root element not found');
    }

    return createPortal(
        <dialog
            ref={dialog}
            className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
        >
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{buttonCaption}</Button>
            </form>
        </dialog>,
        modalRoot
    );
});

export default Modal;