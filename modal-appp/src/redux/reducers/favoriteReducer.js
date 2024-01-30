const initialState = {
    items: [],
  };
  
  const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITE':
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case 'REMOVE_FROM_FAVORITE':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default favoriteReducer;
  