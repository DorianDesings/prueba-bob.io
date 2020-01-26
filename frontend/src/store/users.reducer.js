const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INITAL_USERS':
            return {
                ...state,
                allUsers: action.payload
            }
        case 'ADD_USER':
            return {
                ...state,
                allUsers: [...state.allUsers, action.payload]
            }
        case 'DELETE_USER':
            return {
                ...state,
                allUsers: action.payload
            };
        default:
            return state;
    }

}

export default reducer