import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  filter: filterReducer
});

const store = createStore(reducer, composeWithDevTools());

export default store;
