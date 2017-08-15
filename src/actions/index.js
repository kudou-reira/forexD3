import axios from 'axios';
import { FETCH_DATA } from './types';

export const fetchUser = () => {
	return async (dispatch) => {
		const res = await axios.get('http://api.fixer.io/latest?base=USD');
		//do all the refactoring of objects and array here, then send off with redux-thunk
		dispatch({type: FETCH_DATA, payload: res.data});
	}
};

