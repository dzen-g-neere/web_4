const pointsReducer = (state = [{
    x: "X",
    y: "Y",
    r: "R",
    time: "Time",
    result: "Result"
}], action) => {
    switch (action.type) {
        case "ADD_POINT":
            state.push(action.points);
            return [...state];
        case "SET_POINTS": {
            if (action.points !== undefined && action.points !== null)
            return [{
                x: "X",
                y: "Y",
                r: "R",
                time: "Time",
                result: "Result"
            }].concat(action.points);
            else return ([{
                x: "X",
                y: "Y",
                r: "R",
                time: "Time",
                result: "Result"
            }])
        }
        default:
            return state;
    }
}

export default pointsReducer;