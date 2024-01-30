import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ProductCard from './ProductCard';
import Modal from './Modal';
import { connect } from 'react-redux';
import '../redux/actions'


const Cart = ({ cartItems, favoriteItems, cartCount }) => {
  const [localCartItems, setLocalCartItems] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [localFavoriteItems, setLocalFavoriteItems] = useState([]);
  const [localCartCount, setLocalCartCount] = useState(0);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

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

  const removeFromCart = (productId) => {
    const indexOfItemToRemove = localCartItems.findIndex((item) => item.id === productId);

    if (indexOfItemToRemove !== -1) {
      const updatedCartItems = [
        ...localCartItems.slice(0, indexOfItemToRemove),
        ...localCartItems.slice(indexOfItemToRemove + 1),
      ];

      setLocalCartItems(updatedCartItems);
      setLocalCartCount(updatedCartItems.length);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      localStorage.setItem('cartCount', updatedCartItems.length);
    }
  };

  const handleRemoveItemClick = (item) => {
    setShowRemoveModal(true);
    setItemToRemove(item);
  };

  const handleModalConfirmation = () => {
    removeFromCart(itemToRemove.id);
    setShowRemoveModal(false);
  };

  const handleModalCancel = () => {
    setShowRemoveModal(false);
  };

  return (
    <div>
      <Header cartCount={localCartItems.length} favoritesCount={localFavoriteItems.length} />
      <h2 className='hcf'>Cart</h2>
      <div className="product-list">
        {localCartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <ProductCard product={item} showButtons={false} />
            <button onClick={() => handleRemoveItemClick(item)}>Remove from Cart</button>
          </div>
        ))}
      </div>
      {showRemoveModal && (
        <Modal
          header="Remove from Cart"
          closeButton={true}
          text={`Are you sure you want to remove ${itemToRemove.name} from the cart?`}
          closeModal={handleModalCancel}
          actions={
            <>
              <button onClick={handleModalConfirmation}>Yes, Remove</button>
              <button onClick={handleModalCancel}>Cancel</button>
            </>
          }
        />
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
  favoriteItems: state.favorite.items,
  cartCount: state.cart.items.length,
});

export default connect(mapStateToProps)(Cart);


