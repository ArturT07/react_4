import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ProductCard from './ProductCard';
import Star from '../images/star.png';
import StarClick from '../images/star-click.png'
import { connect } from 'react-redux';


const Favorite = ({ favoriteItems, cartCount }) => {
  const [localCartItems, setLocalCartItems] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [localFavoriteItems, setLocalFavoriteItems] = useState([]);
  const [localCartCount, setLocalCartCount] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setLocalCartItems(storedCartItems);
    const storedFavoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    setLocalFavoriteItems(storedFavoriteItems);

    const storedCartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
    setLocalCartCount(storedCartCount);
    const storedFavoritesCount = JSON.parse(localStorage.getItem('favoritesCount')) || 0;
    setFavoritesCount(storedFavoritesCount);
  }, []);

  const removeFromFavorites = (productId) => {
    const indexOfItemToRemove = localFavoriteItems.findIndex((item) => item.id === productId);

    if (indexOfItemToRemove !== -1) {
      const updatedFavoriteItems = [
        ...localFavoriteItems.slice(0, indexOfItemToRemove),
        ...localFavoriteItems.slice(indexOfItemToRemove + 1),
      ];

      setLocalFavoriteItems(updatedFavoriteItems);
      setFavoritesCount(updatedFavoriteItems.length);
      localStorage.setItem('favoriteItems', JSON.stringify(updatedFavoriteItems));
      localStorage.setItem('favoritesCount', updatedFavoriteItems.length);
    }
  };

  return (
    <div>
      <Header cartCount={localCartItems.length} favoritesCount={localFavoriteItems.length} />
      <h2 className='hcf'>Favorite</h2>
      <div className="product-list">
        {localFavoriteItems.map((item) => (
          <div key={item.id} className="favorite-item">
            <ProductCard
              product={item}
              showButtons={false}
            />
            <img onClick={() => removeFromFavorites(item.id)} 
            src={StarClick}
            alt="Add to Favorites"
            className="remove-favorite-icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Favorite.propTypes = {
  favoriteItems: PropTypes.array.isRequired,
  cartCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteItems: state.favorite.items,
  cartCount: state.cart.items.length,
});

export default connect(mapStateToProps)(Favorite);

