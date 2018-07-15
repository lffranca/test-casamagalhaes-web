const DEFAULT_STATE = {
  items: []
}

export default (state = DEFAULT_STATE, action) => {
  const {type} = action

    switch (type) {
      // case 'GET_CIDADES':
      //     return { ...state, cidades: action.payload }
      default:
        return state;
    }
}