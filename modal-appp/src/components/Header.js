import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.scss';

import basketImage from '../images/basket-click.png';
import starImage from '../images/star-click.png';

const Header = ({ cartCount, favoritesCount }) => {
  return (
    <div className="header">
      <div className="header-item">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/favorites">Favorite</Link>
      </div>
      <div>
      <div className="header-item">
        <img src={basketImage} alt="Cart" />
        <span>{cartCount}</span>
      </div>
      <div className="header-item">
        <img src={starImage} alt="Favorites" />
        <span>{favoritesCount}</span>
      </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  cartCount: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number.isRequired,
};

export default Header;
