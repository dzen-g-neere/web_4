import {useDispatch, useSelector} from "react-redux";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm"
import Main from "./Main";
import signIn from "./actions/signIn";
import setPoints from "./actions/setPoints";
import setMessage from "./actions/setMessage";

function App() {
    const isSignedIn = useSelector(state => state.isSignedIn);
    const userNeedToSignUp = useSelector(state => state.userNeedToSignUp);
    const dispatch = useDispatch();
    if (!isSignedIn) {
        let login = localStorage.getItem("user");
        let password = localStorage.getItem("password");
        if (!login || !password) {
            if (userNeedToSignUp) {
                return (<div className="App">
                    {SignUpForm()}
                </div>);
            } else {
                return (<div className="App">
                    {SignInForm()}
                </div>);
            }
        }
        fetch('/login', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({username: login, password: password})
        })
            .then(response => {
                if (response.ok) {
                    dispatch(signIn());
                    dispatch(setMessage("Signed in successfully"));
                    fetch('/api/points', {
                        method: 'GET'
                    })
                        .then(res => {
                            if (res.ok) {
                                res.json().then(points => dispatch(setPoints(points)));
                            } else dispatch(setMessage("Points loaded successfully"));
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        return (<div className="App">
            {SignInForm()}
        </div>);
    }
    return (<div className="App">
        {Main()}
    </div>);
}

export default App;
