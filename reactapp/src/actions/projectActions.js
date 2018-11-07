import axios from 'axios';
export const FETCH_MYPROJECT = 'FETCH_MYPROJECT';
export const FETCH_MYPROJECT_SUCCESS = 'FETCH_MYPROJECT_SUCCESS';
export const FETCH_MYPROJECT_ERROR = 'FETCH_MYPROJECT_ERROR';


export const fetchMyProjects = () => {
    return dispatch => {
  
        dispatch({ type: FETCH_MYPROJECT});
        axios.get('http://localhost:5000/api/myProjects')
            .then(response => {
                dispatch({ type: FETCH_MYPROJECT_SUCCESS, payload: response.data});
            })
            .catch( err => {
                console.log(err);
                dispatch({ type: FETCH_MYPROJECT_ERROR });
            });
    };
  };
  