const pointsReducer = (state = [{
    x: "X",
    y: "Y",
    r: "R",
    time: "Time",
    result: "Result"
}], action) => {
    switch (action.type) {
        case "SET_POINTS":
            return [{
                x: "X",
                y: "Y",
                r: "R",
                time: "Time",
                result: "Result"
            }].concat(action.points);
        default:
            return state;
    }
}

export default pointsReducer;