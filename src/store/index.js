import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleWare = (store) => (next) => (action) => {
	if (typeof action === 'string') {
		return next({
			type: action
		})
	}
	return next(action)
};

const store = configureStore({
	reducer: {heroes, filters},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;