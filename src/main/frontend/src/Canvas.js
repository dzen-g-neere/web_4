import React, {useRef, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import setPoints from "./actions/callbacks/setPoints";
import setMessage from "./actions/callbacks/setMessage";
import downloadPoints from "./actions/requests/downloadPoints";
import addPoint from "./actions/callbacks/addPoint";

const Canvas = props => {
    const dispatch = useDispatch();
    const R = useSelector(state => state.R);
    const points = useSelector(state => state.points);
    const canvasRef = useRef(null)
    let rect;
    let axis_separator_offset = 5;
    let step = 50;
    const width = 510;
    const height = 510;

    function clickOnCanvas(event) {
        let x = (event.clientX - rect.left - width / 2) / step;
        let y = -(event.clientY - rect.top - height / 2 ) / step;
        x = x.toFixed(2).replace(".00", "");
        y = y.toFixed(2).replace(".00", "");
        console.log(x, y, R);
        if (isLegal(x, y, R)) {
            fetch('/api/points', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    x: x,
                    y: y,
                    r: R
                })
            })
                .then(response => {
                    if (response.ok) {
                        response.json().then(point => dispatch(addPoint(point)));
                        dispatch(setMessage());
                    } else response.text().then(text => dispatch(setMessage(text)));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else dispatch(setMessage("X[-4, 4], Y[-3, 3], R[-4, 4]"));
    }

    function isLegal(x, y, r) {
        return (isNumber(x) && isNumber(y) && isNumber(r) &&
            x >= -4 && x <= 4 && y > -3 && y < 3 && r >= -4 && r <= 4);
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    const drawCanvas = ctx => {
        let valR = R * step;
        ctx.globalAlpha = 1;
        clearCanvas(ctx);
        drawRectangle(valR, ctx);
        drawTriangle(valR, ctx);
        drawCircle(valR, ctx);
        drawAXIS(ctx);
        drawPoints(ctx);
    }

    function drawTriangle(rValue, ctx) {
        ctx.fillStyle = '#FF7400';
        ctx.beginPath();
        ctx.moveTo((width / 2), height / 2 + rValue / 2);
        ctx.lineTo(width / 2 + rValue, height / 2);
        ctx.lineTo(width / 2, height / 2);
        ctx.fill();
    }

    function drawCircle(rValue, ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#FF7400';
        ctx.strokeStyle = '#FF7400';
        if (rValue > 0)
            ctx.arc(width / 2, height / 2, rValue, Math.PI, 3 * Math.PI / 2);
        else ctx.arc(width / 2, height / 2, -rValue, 3 * Math.PI / 2, 2 * Math.PI);
        ctx.lineTo(width / 2, height / 2)
        ctx.fill();
        ctx.stroke();
    }

    function drawRectangle(rValue, ctx) {
        ctx.fillStyle = '#FF7400';
        ctx.strokeStyle = '#FF7400';
        ctx.beginPath();
        ctx.fillRect(width / 2, height / 2 - rValue, rValue / 2, rValue);
    }

    function drawAXIS(ctx) {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.strokeText("Y", 240, 10);
        ctx.strokeText("X", 500, height / 2 - 10);
        ctx.stroke();
        for (let i = -5; i <= 5; i++) {
            ctx.beginPath();
            let x = width / 2 + step * i;
            ctx.moveTo(x, height / 2 + axis_separator_offset);
            ctx.lineTo(x, height / 2 - axis_separator_offset);
            if (i !== 0) {
                ctx.fillText(i.toString(), x - axis_separator_offset / 2, height / 2 + 3 * axis_separator_offset);
            }
            ctx.stroke();
        }

        for (let i = -5; i <= 5; i++) {
            ctx.beginPath();
            let y = height / 2 + step * i;
            ctx.moveTo(width / 2 + axis_separator_offset, y);
            ctx.lineTo(width / 2 - axis_separator_offset, y);
            if (i !== 0) {
                ctx.fillText((-i).toString(), width / 2 + axis_separator_offset, y + axis_separator_offset);
            }
            ctx.stroke();
        }
    }

    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, width, height);
    }

    function drawPoints(ctx) {
        points.forEach(point => {
            drawPoint(point.x, point.y, point.r, point.result, ctx);
        })
    }

    function drawPoint(x, y, r, hit, ctx) {
        if (Number(r) === Number(R)) {
            let pointColor;
            if (hit === true)
                pointColor = '#00ff0b';
            else pointColor = '#ff0000';
            ctx.beginPath();
            ctx.arc(width / 2 + x * step, height / 2 - y * step, axis_separator_offset, 0, Math.PI * 2);
            ctx.fillStyle = pointColor;
            ctx.strokeStyle = pointColor;
            ctx.fill();
            ctx.stroke();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = width;
        canvas.height = height;
        rect = canvas.getBoundingClientRect();
        drawCanvas(context)
        function handleResize() {
            rect = canvas.getBoundingClientRect();
        }
        window.addEventListener('resize', handleResize)
    }, [drawCanvas])

    return <canvas id="points-canvas" onClick={event => clickOnCanvas(event)} ref={canvasRef} {...props}/>
}

export default Canvas;