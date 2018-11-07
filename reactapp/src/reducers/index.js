import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";
import landingPageReducer from "./landingPageReducer";
import myProjectReducer from './myProjectReducer'

export default combineReducers({
  exampleReducer,
  landingPageReducer,
  myProjectReducer   
                            

});
