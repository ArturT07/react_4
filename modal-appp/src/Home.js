import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Button from './components/Button';
import Modal from './components/Modal';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const addToCart = (product) => {
    setCartCount(cartCount + 1);
    setShowCartModal(true);
  };

  const toggleFavorite = (product) => {
    setFavoriteCount(favoriteCount + 1);
    setShowFavoriteModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const closeFavoriteModal = () => {
    setShowFavoriteModal(false);
  };

  return (
    <div className="home">
      <Header cartCount={cartCount} favoriteCount={favoriteCount} />
      <ProductList products={products} onAddToCart={addToCart} onToggleFavorite={toggleFavorite} />
      <Button backgroundColor="lightblue" text="Open Cart" onClick={() => setShowCartModal(true)} />
      <Button backgroundColor="lightgreen" text="Open Favorite" onClick={() => setShowFavoriteModal(true)} />

      {showCartModal && (
        <Modal
          header="Shopping Cart"
          closeButton={true}
          text={`You have ${cartCount} items in your cart.`}
          closeModal={closeCartModal}
          actions={<button onClick={closeCartModal}>Close</button>}
          customClass="cart-modal"
        />
      )}

      {showFavoriteModal && (
        <Modal
          header="Favorite Items"
          closeButton={true}
          text={`You have ${favoriteCount} favorite items.`}
          closeModal={closeFavoriteModal}
          actions={<button onClick={closeFavoriteModal}>Close</button>}
          customClass="favorite-modal"
        />
      )}
    </div>
  );
};

export default Home;
