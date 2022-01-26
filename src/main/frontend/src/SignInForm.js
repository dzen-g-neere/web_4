import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {TextField} from "@mui/material";
import needToSignUp from "./actions/needToSignUp";
import setUserCredentials from "./actions/setUserCredentials";
import signIn from "./actions/signIn";
import setMessage from "./actions/setMessage";
import setPoints from "./actions/setPoints";

function SignInForm() {
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
                <h1>Залевский Дмитрий Р3212 Вариант 12050</h1>
            </div>
            <div id="page">
                Enter your Login and Password:
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
                        fetch('/login', {
                            method: 'POST', headers: {
                                'Content-Type': 'application/json',
                            }, body: JSON.stringify({
                                username: userCredentials.login,
                                password: userCredentials.password
                            })
                        })
                            .then(response => {
                                if (response.ok) {
                                    fetch('/api/points', {
                                        method: 'GET'
                                    })
                                        .then(res => {
                                            if (res.ok) {
                                                res.json().then(data => dispatch(setPoints(data)));
                                            } else dispatch(setMessage("Points loaded successfully"));
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error);
                                        });
                                    localStorage.setItem("user", userCredentials.login);
                                    localStorage.setItem("password", userCredentials.password);
                                    dispatch(signIn());
                                    dispatch(setMessage("Signed in successfully"));
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    }
                }}>Submit</Button>
                <Button variant={"outlined"} onClick={() => dispatch(needToSignUp(true))}>Sign Up</Button>
            </div>
        </div>
    );
}


export default SignInForm;