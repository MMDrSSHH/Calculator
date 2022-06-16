import { Button } from '@mui/material';
import React from 'react';

const OperationButton = ({ type, operator, dispatch }) => {
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
            onClick={() => dispatch({ type: type, payload: operator })}
        >
            {operator}
        </Button>
    );
}

export default OperationButton;