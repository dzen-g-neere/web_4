const userCredentialsReducer = (state = {
    login: "",
    password: ""
}, action) => {
    switch (action.type) {
        case "SET_CREDENTIALS":
            return {
                login: action.login,
                password: action.password
            }
        default:
            return state;
    }
}

export default userCredentialsReducer;