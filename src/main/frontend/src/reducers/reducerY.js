const yReducer = (state = 0, action) => {
    switch (action.type) {
        case "SET_Y":
            return +action.value;
        default:
            return state;
    }
}

function isNumber(value) {
    return !isNaN(value) && isFinite(+value);
}

export default yReducer;