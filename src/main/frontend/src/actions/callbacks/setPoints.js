const setPoints = (points = [{
    x: "X",
    y: "Y",
    r: "R",
    time: "Time",
    result: "Result"
}]) => {
    return {
        type: "SET_POINTS",
        points: points
    }
}

export default setPoints;