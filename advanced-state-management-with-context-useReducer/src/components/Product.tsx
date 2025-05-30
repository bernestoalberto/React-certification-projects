
import { useContext } from 'react';
import {CartContext} from './../store/shopping-cart-context';


export interface ProductProps {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  onAddToCart: (id: string) => void;
}

export default function Product({
  id,
  image,
  title,
  price,
  description }: ProductProps) {
    const { addItemToCart } = useContext(CartContext);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
