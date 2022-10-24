import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { TextField } from '@mui/material';
import { Typography } from '@material-ui/core';
import SectionLabel from './SectionLabel';

const inputFieldProps = {
    style: {
        textAlign:'start',
        fontSize:'1.5rem',
    }
}

export default function TokenField({token, setToken}) {
    const {
        errorMessage,
    } = useContext(StockImageContext);
    return (
        <>
            <SectionLabel labelText='Token'/>
            <TextField variant='standard' size='string' value={token} onChange={(e)=>{setToken(e.target.value)}} inputProps={inputFieldProps}/>
            {errorMessage
                ?
                <Typography variant='h4' align='left' color='error'>
                    {errorMessage}
                </Typography>
                :
                <></>
            }
        </>
    )
}