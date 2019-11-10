export const FETCH_PRODUCT_LIST_SUCCESS = 'FETCH_PRODUCT_LIST_SUCCESS';
export const FETCH_PRODUCT_LIST_LOADING = 'FETCH_PRODUCT_LIST_LOADING';
export const FETCH_PRODUCT_LIST_ERROR = 'FETCH_PRODUCT_LIST_ERROR';

export const getProducts = () => {
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCT_LIST_LOADING });
    try {
      const response = await fetch('/products/all');
      const products = await response.json();
      dispatch({ type: FETCH_PRODUCT_LIST_SUCCESS, products });
    } catch (e) {
      dispatch({ type: FETCH_PRODUCT_LIST_ERROR });
    }
  };
};
