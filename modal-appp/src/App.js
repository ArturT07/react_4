import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/actions';
import Modal from './components/Modal';
import Cart from './components/Cart';
import Favorite from './components/Favorite';
import productsData from './data/products.json';
import './reset.scss';
import './App.scss';

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedFavoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

    setCartItems(storedCartItems);
    setFavoriteItems(storedFavoriteItems);
  }, []);

  useEffect(() => {
    setCartCount(cartItems.length);
    setFavoritesCount(favoriteItems.length);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [cartItems, favoriteItems]);

  const openModal = (content) => {
    setShowModal(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    openModal({ header: 'Added to Cart', text: 'The item has been added to the cart.' });
  };

  const removeFromCart = () => {
    setCartItems((prevItems) => prevItems.slice(0, -1));
    closeModal();
  };

  const addToFavorites = (product) => {
    setFavoriteItems((prevItems) => [...prevItems, product]);
    openModal({ header: 'Added to Favorites', text: 'The item has been added to favorites.' });
  };

  const removeFromFavorites = () => {
    setFavoriteItems((prevItems) => prevItems.slice(0, -1));
    closeModal();
  };

  return (
    <div className="app">
      <Header cartCount={cartCount} favoritesCount={favoritesCount} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1 className='hcf'>Home</h1>
              <div className="product-list">
                {productsData.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                    onRemoveFromCart={removeFromCart}
                    onAddToFavorites={() => addToFavorites(product)}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                ))}
              </div>
            </div>
          }
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} />}
        />
        <Route
          path="/favorites"
          element={<Favorite favoriteItems={favoriteItems} />}
        />
      </Routes>

      {showModal && (
        <Modal
        header={modalContent.header}
        closeButton={true}
        text={modalContent.text}
        closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
