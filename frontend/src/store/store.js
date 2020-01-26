import { createStore } from 'redux';
import reducer from './users.reducer'

const initialState = {
    allUsers: []
};

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
