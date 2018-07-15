import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';

export default combineReducers({
  Category: CategoryReducer,
});