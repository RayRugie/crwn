import { React, useContext } from 'react';

import Button from "../button/button.component";
import { CartContext } from '../../contexts/cart.context';

import "../product-card/product-card.styles.scss";


const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const {addItemToCart} = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product)

  return (
    <div className="product-card-container" key={product.id}> {/* Add key prop */}
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
    </div>
  );
};

export default ProductCard;