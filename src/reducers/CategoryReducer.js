import { EVENT_CATEGORY_RECEIVE_ALL } from "../constants/category-constant";

const DEFAULT_STATE = {
  items: []
}

export default (state = DEFAULT_STATE, action) => {
  const {type, payload} = action

    switch (type) {
      case EVENT_CATEGORY_RECEIVE_ALL:
          return { ...state, items: payload }
      default:
        return state;
    }
}