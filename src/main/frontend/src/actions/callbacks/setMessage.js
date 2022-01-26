const setMessage = (state = " ") => {
    return {
        type: "SET_STATE",
        state: state
    }
}

export default setMessage;