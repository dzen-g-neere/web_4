import {useSelector, useDispatch} from "react-redux";
import {Button, TextField} from "@mui/material";

import setUserCredentials from "./actions/setUserCredentials";
import setMessage from "./actions/setMessage";
import needToSignUp from "./actions/needToSignUp";

function SignUpForm() {
    const dispatch = useDispatch();
    const X = useSelector(state => state.X);
    const Y = useSelector(state => state.Y);
    const R = useSelector(state => state.R);
    const userCredentials = useSelector(state => state.userCredentials);
    const points = useSelector(state => state.points);
    const message = useSelector(state => state.message);
    return (
        <div>
            <div id="header">
                <h1>Залевский Дмитрий P3212 Вариант 12050</h1>
            </div>
            <div id="page">
                Enter new Login and Password:
                <br/>
                <form>
                    <label htmlFor="login">Login<br/></label>
                    <TextField variant={"outlined"} id="login" onChange={(val) => {
                        dispatch(setUserCredentials(val.target.value, userCredentials.password))
                    }}/>
                    <br/>
                    <label htmlFor="password">Password<br/></label>
                    <TextField variant={"outlined"} id="password" type="password" onChange={(val) => {
                        dispatch(setUserCredentials(userCredentials.login, val.target.value))
                    }}/>
                    <br/>
                    {message}
                </form>
                <Button variant={"contained"} onClick={() => {
                    if (userCredentials.password === "") {
                        dispatch(setMessage("Password can not be empty string"));
                    } else if (userCredentials.login === "") {
                        dispatch(setMessage("Login can not be empty string"));
                    } else {
                        fetch('/registration', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({username: userCredentials.login, password: userCredentials.password})
                        })
                            .then(response => {
                                if (response.ok) {
                                    dispatch(needToSignUp(false));
                                    dispatch(setMessage("Successfully signed up"))
                                } else response.text().then(text => dispatch(setMessage(text)))
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    }
                }}>Submit</Button>
                <Button variant={"outlined"} onClick={() => dispatch(needToSignUp(false))}>Sign In</Button>
            </div>
        </div>
    );
}


export default SignUpForm;