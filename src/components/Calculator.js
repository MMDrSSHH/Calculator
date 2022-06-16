/* eslint-disable default-case */
import { Box, Grid, Button, Typography } from '@mui/material';
import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

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
                }}>
                    <Grid container spacing={0.5} height="100%">
                        {/* First row */}
                        <Grid item xs={3}>
                            <OperationButton type="ALL_CLEAR" operator="AC" dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <OperationButton type="DELETE" operator="D" dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <OperationButton type="ADD_OPERATOR" operator="%" dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <OperationButton type="ADD_OPERATOR" operator="/" dispatch={dispatch} />
                        </Grid>
                        {/* Second row */}
                        <Grid item xs={3}>
                            <DigitButton digit={"7"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <DigitButton digit={"8"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <DigitButton digit={"9"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <OperationButton type="ADD_OPERATOR" operator="*" dispatch={dispatch} />
                        </Grid>
                        {/* Third row */}
                        <Grid item xs={3}>
                            <DigitButton digit={"4"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <DigitButton digit={"5"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <DigitButton digit={"6"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <OperationButton type="ADD_OPERATOR" operator="-" dispatch={dispatch} />
                        </Grid>
                        {/* Fourth row*/}
                        <Grid item xs={3}>
                            <DigitButton digit={"1"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <DigitButton digit={"2"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <DigitButton digit={"3"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <OperationButton type="ADD_OPERATOR" operator="+" dispatch={dispatch} />
                        </Grid>
                        {/* Fifth row */}
                        <Grid item xs={6}>
                            <DigitButton digit={"0"} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <DigitButton digit={"."} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={3}>
                            <OperationButton type="EVALUATE" operator="=" dispatch={dispatch} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box >
    );
};

export default Calculator;