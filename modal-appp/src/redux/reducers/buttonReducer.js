import { CLICK_BUTTON } from '../actionTypes';

const initialState = {
  clicked: false,
};

const buttonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_BUTTON:
      return {
        ...state,
        clicked: true,
      };
    default:
      return state;
  }
};

export default buttonReducer;
