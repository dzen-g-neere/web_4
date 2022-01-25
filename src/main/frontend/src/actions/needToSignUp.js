const needToSignUp = (state = true) => {
    if (state) {
        return {
            type: "NEED"
        }
    } else {
        return {
            type: "NO_NEED"
        }
    }
}

export default needToSignUp;