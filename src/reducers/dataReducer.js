import { FETCH_DATA, FETCH_TIME_DATA, RENDER_CHART } from '../actions/types';
import fakeData from '../data/fakeData';
// return false if user is not logged in
// if not declared 'false', action.payload return is an empty string ''
// in header.js, the action.payload returned through authreducer decides rendering

const INITIAL_STATE = {
	currency: fakeData,
	currencyTime: [],
	render: true
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type){
		case FETCH_DATA:
			return {...state, currency: action.payload};
		case FETCH_TIME_DATA:
			return {...state, currencyTime: action.payload};
		case RENDER_CHART:
			return {...state, render: action.payload};
		default:
			return state;
	}
}