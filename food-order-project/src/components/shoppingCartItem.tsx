import { currencyFormatter } from '../util/formatting.ts';

export default function CartItem({
    name,
    quantity,
    price,
    onIncrease,
    onDecrease,
}: {
    name: string;
    quantity: number;
    price: number;
    onIncrease: () => void;
    onDecrease: () => void;
}) {
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} x {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}