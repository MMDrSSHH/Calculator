import { Button } from '@mui/material'
import React from 'react'

const DigitButton = ({ dispatch, digit }) => {
    return (
        <Button sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            fontSize: '30px',
            fontWeight: 'bold',
            '&:hover': {
                color: 'white',
                backgroundColor: 'transparent',
            }
        }}
            onClick={() => dispatch({ type: "ADD_DIGIT", payload: digit })}
        >
            {digit}
        </Button>
    );
}

export default DigitButton