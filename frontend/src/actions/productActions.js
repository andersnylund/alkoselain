export const FETCH_PRODUCTS_SUCCESS = 'SET_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_LOADING = 'SET_PRODUCTS_LOADING';
export const FETCH_PRODUCTS_ERROR = 'SET_PRODUCTS_ERROR';

export const getProducts = () => {
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_LOADING });
    try {
      const response = await fetch('/products/all');
      const products = await response.json();
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, products });
    } catch (e) {
      dispatch({ type: FETCH_PRODUCTS_ERROR });
    }
  };
};
