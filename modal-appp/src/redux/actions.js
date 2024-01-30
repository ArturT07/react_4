import { CLOSE_MODAL, OPEN_MODAL } from './actionTypes';
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE, GET_PRODUCTS_SUCCESS } from './actionTypes';
import { CLICK_BUTTON } from './actionTypes';

export const clickButton = () => ({
  type: CLICK_BUTTON,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const addToFavorites = (product) => ({
  type: ADD_TO_FAVORITE,
  payload: product,
});

export const removeFromFavorites = (productId) => ({
  type: REMOVE_FROM_FAVORITE,
  payload: productId,
});

export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      dispatch(getProductsSuccess(data.products));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};
