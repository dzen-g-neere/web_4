const rReducer = (state = 1, action) => {
    switch (action.type) {
        case "SET_R":
            return action.value;
        default:
            return state;
    }
}

export default rReducer;