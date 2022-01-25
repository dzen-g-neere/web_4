const wantToReg = (state = false, action) => {
    switch (action.type) {
        case "NEED":
            return true;
        case "NO_NEED":
            return false;
        default:
            return state;
    }
}

export default wantToReg;