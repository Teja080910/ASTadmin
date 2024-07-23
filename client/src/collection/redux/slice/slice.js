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
        case 'BOOT':
            return {
                ...state,
                bootmail: action.payload.bootmail,
                bootpassword: action.payload.bootpassword
            };
        case 'ROUND':
            return {
                ...state,
                round: action.payload.round
            }
        case 'CONSOLE':
            return{
                ...state,
                adminEmail: action.payload.adminEmail,
                adminLoginState: action.payload.adminLoginState,
            }
        default:
            return state;
    }
};

export default userReducer;  