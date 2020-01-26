import { createStore } from 'redux';
import reducer from './users.reducer'

const initialState = {
    allUsers: []
};

export const store = createStore(
    reducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
);
