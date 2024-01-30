import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.scss';
import Star from '../images/star.png';
import StarClick from '../images/star-click.png'
import { connect } from 'react-redux';
import { addToCart, addToFavorites } from '../redux/actions';

const ProductCard = ({
  product,
  onAddToCart,
  onAddToFavorites,
  showButtons = true,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const handleAddToCart = () => {
    if (!addedToCart) {
      onAddToCart();
      setAddedToCart(false);
    }
  };

  const handleAddToFavorites = () => {
    if (!addedToFavorites) {
      onAddToFavorites();
      setAddedToFavorites(true);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Article: {product.article}</p>
      <p>Color: {product.color}</p>
      {showButtons && (
        <>
          {addedToCart ? (
            <button disabled={true}>Added to Cart</button>
          ) : (
            <button onClick={handleAddToCart}>Add to Cart</button>
          )}
          {addedToFavorites ? (
            <img
              src={StarClick} 
              alt="Added to Favorites"
              className="favorite-icon"
              onClick={handleAddToFavorites}
            />
          ) : (
            <img
              src={Star} 
              alt="Add to Favorites"
              className="favorite-icon"
              onClick={handleAddToFavorites}
            />
          )}
        </>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  showButtons: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  // onAddToCart: (product) => dispatch(addToCart(product)),
  // onAddToFavorites: (product) => dispatch(addToFavorites(product)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
