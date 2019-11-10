export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_LOADING = 'FETCH_PRODUCT_LOADING';
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR';

export const getProduct = id => {
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCT_LOADING });
    try {
      const response = await fetch(`/products/${id}`);
      const product = await response.json();
      dispatch({ type: FETCH_PRODUCT_SUCCESS, product });
    } catch (e) {
      dispatch({ type: FETCH_PRODUCT_ERROR });
    }
  };
};
