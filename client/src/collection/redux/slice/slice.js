const initialState = {
    username: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username,
            };
        case 'ROUND':
            return{
                ...state,
                round:action.payload.round
            }
        default:
            return state;
    }
};

export default userReducer;  