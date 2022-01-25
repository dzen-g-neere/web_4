const clearPoints = () => {
    return {
        type: "SET_POINTS",
        data: [{
            x: "X",
            y: "Y",
            r: "R",
            time: "Time",
            result: "Result"
        }]
    }
}

export default clearPoints;