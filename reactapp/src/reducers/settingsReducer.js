import {
  GETTING_USERNAME,
  GOT_USERNAME,
  GET_USERNAME_ERROR
} from "../actions";

const initialState = {
  gettingUsername: false,
  username: '',
  error: null
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // get userInfo
    case GETTING_USERNAME:
      return { ...state, gettingUsername: true };

    case GOT_USERNAME:
      return {
        ...state,
        gettingUsername: false,
        username: action.payload
      };

    case GET_USERNAME_ERROR:
      return {
        ...state,
        gettingUserInfo: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default settingsReducer;
