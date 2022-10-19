import { Button, Grid } from '@mui/material';
import { TextField, Typography } from '@material-ui/core';
import '../styles/App.css';
import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';

export default function StockImageBatch() {
    const {
        inputPrompt, setInputPrompt,
        inputPrompts, setInputPrompts,
    } = useContext(StockImageContext);
    return(
        <Grid container>
            <Grid item lg={6} sx={{padding:'1rem'}}>
                <TextField varient='outlined' value={inputPrompt} onChange={(e)=>{setInputPrompt(e.target.value)}}/>
                <Button disabled={!inputPrompt} variant='contained' onClick={()=>{setInputPrompts([...inputPrompts, inputPrompt]);setInputPrompt('');}}>Add</Button>
                {inputPrompts.map((prompt, i) => {
                    return(
                    <Typography key={i} align='left'>
                        {prompt}
                    </Typography>
                    )
                })}
                <div>
                    <Button disabled={!inputPrompts.length} variant='contained' onClick={()=>{setInputPrompts([])}}>Send</Button>
                </div>
            </Grid>
            <Grid item lg={6}>

            </Grid>
        </Grid>
    )
}