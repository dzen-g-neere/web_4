import React from "react";
import './Main.css';

import {Button, ButtonGroup, Input} from "@mui/material";
import {Table} from "@mui/material";
import {TableCell} from "@mui/material";
import {TableHead} from "@mui/material";
import {TableRow} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";
import setX from "./actions/setX";
import setY from "./actions/setY";
import setR from "./actions/setR";
import setMessage from "./actions/setMessage";
import setPoints from "./actions/setPoints";
import clearPoints from "./actions/clearPoints";
import signOut from "./actions/signOut";
import {logDOM} from "@testing-library/react";

function Main() {
    const dispatch = useDispatch();
    const X = useSelector(state => state.X);
    const Y = useSelector(state => state.Y);
    const R = useSelector(state => state.R);
    const userCredentials = useSelector(state => state.userCredentials);
    const points = useSelector(state => state.points);
    const message = useSelector(state => state.message);

    return (<div id="container">

        <div id="header">
            <h1>Залевский Дмитрий Р3212 Вариант 12050 <Button variant={"contained"} id="signOut"
                                                              onClick={() => {
                                                                  localStorage.removeItem("user");
                                                                  localStorage.removeItem("password");
                                                                  dispatch(setMessage())
                                                                  dispatch(clearPoints());
                                                                  dispatch(signOut());
                                                              }}>Sign out</Button></h1>
        </div>

        <div id="page">

            <div id="content">

                <div id="input-field">
                    <form>
                        <div>
                            Coordinate Х: {X}<br/>
                            <ButtonGroup variant={"outlined"}>
                                <Button onClick={() => dispatch(setX(-4))}>-4</Button>
                                <Button onClick={() => dispatch(setX(-3))}>-3</Button>
                                <Button onClick={() => dispatch(setX(-2))}>-2</Button>
                                <Button onClick={() => dispatch(setX(-1))}>-1</Button>
                                <Button onClick={() => dispatch(setX(0))}>0</Button>
                                <Button onClick={() => dispatch(setX(1))}>1</Button>
                                <Button onClick={() => dispatch(setX(2))}>2</Button>
                                <Button onClick={() => dispatch(setX(3))}>3</Button>
                                <Button onClick={() => dispatch(setX(4))}>4</Button>
                            </ButtonGroup>

                        </div>
                        <div>
                            Coordinate Y от [-3, 3]: {Y}<br/>
                            <Input id="Y" type={"number"} onChange={(val) => {
                                dispatch(setY(val.target.value));
                            }}/>
                        </div>
                        <div>
                            Параметр R: {R}<br/>
                            <ButtonGroup variant={"outlined"}>
                                <Button onClick={() => dispatch(setR(-4))}>-4</Button>
                                <Button onClick={() => dispatch(setR(-3))}>-3</Button>
                                <Button onClick={() => dispatch(setR(-2))}>-2</Button>
                                <Button onClick={() => dispatch(setR(-1))}>-1</Button>
                                <Button onClick={() => dispatch(setR(1))}>1</Button>
                                <Button onClick={() => dispatch(setR(2))}>2</Button>
                                <Button onClick={() => dispatch(setR(3))}>3</Button>
                                <Button onClick={() => dispatch(setR(4))}>4</Button>
                            </ButtonGroup>
                        </div>
                        {message}
                        <div><Button label="Отправить" onClick={() => {
                            if (typeof Y === 'number' && Y <= 3 && Y >= -3) {
                                fetch('/api/points', {
                                    method: 'POST', headers: {
                                        'Content-Type': 'application/json',
                                    }, body: JSON.stringify({
                                        x: X,
                                        y: Y,
                                        r: R
                                    })
                                })
                                    .then(response => {
                                        if (response.ok) {
                                            fetch('/api/points', {
                                                method: 'GET'
                                            })
                                                .then(res => {
                                                    if (res.ok) {
                                                        res.json().then(points => dispatch(setPoints(points)));
                                                        console.log(points);
                                                    } else res.text().then(text => dispatch(setMessage(text)))
                                                })
                                                .catch((error) => {
                                                    console.error('Error:', error);
                                                });
                                        } else response.text().then(text => dispatch(setMessage(text)));
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });

                            } else dispatch(setMessage("Y should be number from -3 to 3"));
                        }}>Submit</Button></div>
                    </form>
                </div>


                <div id="footer">
                    <Table id="points_table">
                        {points.map((point, i) => {
                            if (i === 0) {
                                return (<TableHead key={i}>
                                    <TableCell>{point.x}</TableCell>
                                    <TableCell>{point.y}</TableCell>
                                    <TableCell>{point.r}</TableCell>
                                    <TableCell>{point.time}</TableCell>
                                    <TableCell>{point.result}</TableCell>
                                </TableHead>)
                            }
                            return (<TableRow key={i}>
                                <TableCell>{point.x}</TableCell>
                                <TableCell>{point.y}</TableCell>
                                <TableCell>{point.r}</TableCell>
                                <TableCell>{window.innerWidth > 641 ? point.time : point.time.substring(0, 11)}</TableCell>
                                <TableCell>{point.result ? "true" : "false"}</TableCell>
                            </TableRow>)
                        })}
                    </Table>
                </div>

            </div>

        </div>

    </div>);
}

export default Main;