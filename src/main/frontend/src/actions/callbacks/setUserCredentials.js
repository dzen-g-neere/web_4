const setUserCredentials = (login, password) => {
    return {
        type: "SET_CREDENTIALS",
        login: login,
        password: password
    }
}

export default setUserCredentials;
