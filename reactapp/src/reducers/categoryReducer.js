
import { ADDING_POST, ADDED_POST, ADD_POST_ERROR } from '../actions';

const initialState = {
  category: {},
  postToAdd: false,
  addingPost: false,
  addingPostError: false,

  postToUpdate: null,
  updatingPost: false,
  updatingPostError: false,

  postToDelete: null,
  deletingPost: false,
  deletingPostError: false
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // addPost
    case ADDING_POST:
      return { ...state, addingPost: true };

    case ADDED_POST:
      return {
        ...state,
        addingPost: false,
        postToAdd: false
      };

    case ADD_POST_ERROR:
      return {
        ...state,
        addingPost: false,
        addingPostError: `${action.payload}`
      };
    default:
      return state;
  }
};

export default categoryReducer;