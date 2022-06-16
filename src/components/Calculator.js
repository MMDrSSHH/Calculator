/* eslint-disable default-case */
import { Box, Grid, Button, Typography } from '@mui/material';
import React, { useReducer } from 'react';

const initialState = {
    prevNumber: "",
    currentNumber: "",
    operator: "",
    isEvaluated: false,
}


const evaluation = (firstOp = "0", secondOp = "0", op) => {
    const first = parseFloat(firstOp);
    const second = parseFloat(secondOp);
    switch (op) {
        case "+":
            return Math.round((first + second) * 100) / 100;
        case "-":
            return Math.round((first - second) * 100) / 100;
        case "*":
            return Math.round((first * second) * 100) / 100;
        case "/":
            return Math.round((first / second) * 100) / 100;
        case "%":
            return Math.round((first % second) * 100) / 100;
    }
}



const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_DIGIT":
            if (state.isEvaluated) {
                if (action.payload === ".") {
                    return {
                        ...state,
                        currentNumber: "0.",
                        isEvaluated: false,
                    }
                } else {
                    return {
                        ...state,
                        currentNumber: action.payload,
                        isEvaluated: false,
                    }
                }
            }
            if (action.payload === ".") {
                if (state.currentNumber === "") {
                    return {
                        ...state,
                        currentNumber: "0.",
                    }
                } else if (!state.currentNumber.includes(".")) {
                    return {
                        ...state,
                        currentNumber: state.currentNumber + action.payload,
                    }
                }
                return state;
            }
            return {
                ...state,
                currentNumber: state.currentNumber + action.payload,
            }
        case "ADD_OPERATOR":
            if ((action.payload === "+" || action.payload === "-") && !state.currentNumber) {
                return {
                    ...state,
                    currentNumber: action.payload + "0",
                }
            }
            return {
                ...state,
                prevNumber: state.currentNumber,
                currentNumber: "",
                operator: action.payload,
            }
        case "EVALUATE":
            const result = evaluation(state.prevNumber, state.currentNumber, state.operator);
            return {
                ...state,
                prevNumber: "",
                currentNumber: result + "",
                operator: "",
                isEvaluated: true,
            }
        case "ALL_CLEAR":
            return initialState;

        case "DELETE":
            if (state.isEvaluated) {
                return initialState;
            } else if (state.currentNumber) {
                return {
                    ...state,
                    currentNumber: state.currentNumber.slice(0, state.currentNumber.length - 1),
                }
            }
            return state;

    }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0
});

function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".");

    if (decimal == null) return INTEGER_FORMATTER.format(integer);

    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}


const Calculator = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Box sx={{
            backgroundColor: '#222',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{
                width: "600px",
                borderRadius: '5px',
                overflow: 'hidden',
            }}>
                {/* Calculator display */}
                <Box sx={{
                    backgroundColor: '#4D5BDE',
                    minHeight: '100px',
                    color: '#FFFFFF',
                    padding: "5px",
                    textAlign: 'right',
                }}>
                    <Typography variant="body1" marginTop="20px" sx={{
                        opacity: 0.6
                    }}>
                        {formatOperand(state.prevNumber)} {state.operator}
                    </Typography>
                    <Typography variant="body1" fontSize="20px" sx={{
                        wordBreak: "break-all",
                    }}>
                        {formatOperand(state.currentNumber)}
                    </Typography>
                </Box>
                {/* Calculator button pad */}
                <Box sx={{
                    height: "600px",
                    backgroundColor: '#FC3C79',
                    padding: '10px 5px 5px 5px',
                    "& .button": {
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                        fontSize: "30px",
                        fontWeight: "bold",
                        "&:hover": {
                            color: "white",
                            backgroundColor: "transparent",
                        }
                    }
                }}>
                    <Grid container spacing={0.5} height="100%">
                        {/* Firts row */}
                        <Grid item xs={3}>
                            <Button className="button" onClick={() => dispatch({ type: "ALL_CLEAR" })}>AC</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button" onClick={() => dispatch({ type: "DELETE" })}>D</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button" onClick={(event) => dispatch({ type: "ADD_OPERATOR", payload: event.target.innerText })}>%</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button" onClick={(event) => dispatch({ type: "ADD_OPERATOR", payload: event.target.innerText })}>/</Button>
                        </Grid>
                        {/* Second row */}
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>7</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>8</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>9</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button" onClick={(event) => dispatch({ type: "ADD_OPERATOR", payload: event.target.innerText })}>*</Button>
                        </Grid>
                        {/* Third row */}
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>4</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>5</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>6</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button" onClick={(event) => dispatch({ type: "ADD_OPERATOR", payload: event.target.innerText })}>-</Button>
                        </Grid>
                        {/* Fourth row*/}
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>1</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>2</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>3</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button" onClick={(event) => dispatch({ type: "ADD_OPERATOR", payload: event.target.innerText })}>+</Button>
                        </Grid>
                        {/* Fifth row */}
                        <Grid item xs={6}>
                            <Button className="button digit" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>0</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button dot" onClick={(event) => dispatch({ type: "ADD_DIGIT", payload: event.target.innerText })}>.</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className="button" onClick={() => dispatch({ type: "EVALUATE" })} >=</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box >
    );
};

export default Calculator;