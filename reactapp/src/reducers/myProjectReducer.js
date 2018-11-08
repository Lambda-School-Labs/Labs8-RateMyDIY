import {
  FETCH_MYPROJECT,
  FETCH_MYPROJECT_SUCCESS,
  FETCH_MYPROJECT_ERROR,
} from "../actions";

const initialState = {
  myProjects: [],
  error: null
};

const myProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    // example action
    case FETCH_MYPROJECT:
      return { ...state };
    case FETCH_MYPROJECT_SUCCESS:
      return { ...state , myProjects: action.payload };
    case FETCH_MYPROJECT_ERROR:
      return { ...state , error: 'Error fetching data'};

    default:
      return state;
  }
};

export default myProjectReducer;
