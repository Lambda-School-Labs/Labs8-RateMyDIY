import axios from 'axios';
axios.defaults.withCredentials = true;

// get userInfo
export const GETTING_USERNAME = 'GETTING_USERNAME';
export const GOT_USERNAME = 'GOT_USERNAME';
export const GET_USERNAME_ERROR = 'GET_USERNAME_ERROR';

export const getUsername = (username) => {
	return dispatch => {
		dispatch({ type: GETTING_USERNAME });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/api/users/change`, { username: username }
			)

			.then(({data}) => {
				console.log('success', data);
				// if (data.username) {
				// 	dispatch({ type: GOT_USERNAME, payload: data.username });
				// } else {
				// 	dispatch({ type: GET_USERNAME_ERROR, payload: data.nickname });
				// }
			})

            .catch(error => {
                console.log('error', error);
                dispatch({ type: GET_USERNAME_ERROR, payload: error.response.data })
            });
	};
};
