import { useContext, useRef } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { TextField } from '@mui/material';
import { Typography } from '@material-ui/core';
import SectionLabel from './SectionLabel';

export default function TokenField() {
    const {
        token, setToken,
        listJobs,
        errorMessage,
    } = useContext(StockImageContext);

    const textFieldRef = useRef(null);

    const inputFieldProps = {
        style: {
            textAlign:'start',
            fontSize:'1.5rem',
        },
        ref: textFieldRef
    }

    function handleKey(key){
        if(key === 'Enter'){
            listJobs();
            textFieldRef.current.blur();
        }
    }

    return (
        <>
            <SectionLabel labelText='Token'/>
            <TextField variant='standard' size='string' value={token} onChange={(e)=>{setToken(e.target.value)}} inputProps={inputFieldProps} onBlur={()=>listJobs()} onKeyDown={(e)=>{handleKey(e.key)}}/>
            {errorMessage
                ?
                <Typography variant='h5' align='left' color='error'>
                    {errorMessage}
                </Typography>
                :
                <></>
            }
        </>
    )
}