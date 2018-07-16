import { EVENT_CATEGORY_RECEIVE_ALL } from '../constants/category-constant';

export const getAllCategories = (items) => {
  return {
    type: EVENT_CATEGORY_RECEIVE_ALL,
    payload: items
  }
}
