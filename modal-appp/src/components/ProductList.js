import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.scss';

const ProductList = ({ products, onAddToCart, onToggleFavorite }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default ProductList;
