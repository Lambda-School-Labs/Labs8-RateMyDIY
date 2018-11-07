import { GET_PROJECTS, GET_MAKERS, GET_REVIEWERS } from "../actions";

const initialState = {
  featuredProjects: [],
  popularMakers: [],
  popularReviewers: [
    {
      id: 2,
      name: "Tristen",
      star_count: 4.2,
      author: "john",
      photo_url: "someURL.com"
    }
  ]
};

const landingPageReducer = (state = initialState, action) => {
  switch (action.type) {
    // example action
    case GET_PROJECTS:
      return { ...state, featuredProjects: action.payload };
    case GET_MAKERS:
      return { ...state, popularMakers: action.payload };
    case GET_REVIEWERS:
      return { ...state, popularReviewers: action.payload };
    default:
      return state;
  }
};

export default landingPageReducer;
