import axios from "axios";
import { getProjectLite } from '../actions';

export const ADDING_CATEGORY = 'ADDING_CATEGORY';
export const ADDED_CATEGORY = 'ADDED_CATEGORY';
export const ADD_CATEGORY_ERROR = 'ADD_CATEGORY_ERROR';



export const addCATEGORY = category => {
	return dispatch => {
		dispatch({ type: ADDING_CATEGORY });

		axios.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +`/api/category/`, category )
			.then( (response) => {
				console.log(response)
				dispatch({ type: ADDED_CATEGORY , payload: response.data});
				console.log(response.data )
            })
            
			.catch(error => dispatch({ type: ADD_CATEGORY_ERROR, payload: error }));
	};
};