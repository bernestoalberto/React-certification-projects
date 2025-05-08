
import { useRef } from 'react';
import Modal from '../shared/Modal';

export function OrderConfirnationModal() {
    const modal = useRef<HTMLDialogElement>(null);

    function openModal() {
        modal.current?.showModal();
    }

    return (
        <>
            <Modal
                buttonAltAction='Okay'
                ref={modal}
            >
                <h2>Success!</h2>
                <p>Your order has been placed successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
            </Modal>
        </>
    );
}
