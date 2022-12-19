import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { Grid, Button, Checkbox, FormControlLabel } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { TextField } from '@mui/material';

const buttonStyle = {
    margin: '2rem',
    fontSize: '1.5rem',
}

const jobNameInputStyle = {
    marginTop: '1rem',
    minWidth: '20rem',
}

const inputFieldProps = {
    style: {
        textAlign:'start',
    },
}

export default function FileUpload() {
    const {
        inputFile, setInputFile, sendBatchJob,
        inputJobName, setInputJobName,
        steps, setSteps,
        cfg, setCFG,
        hrFix, setHRFix,
        restoreFace, setRestoreFace,
    } = useContext(StockImageContext);

    function handleStepsInput(steps) {
        let newSteps = parseInt(steps);
        if(newSteps<0){
            newSteps=0;
        }
        if(!newSteps){
            newSteps=0;
        }
        setSteps(newSteps);
    }

    function handleCFGInput(cfg) {
        let newCFG = parseFloat(cfg).toFixed(1);
        if(newCFG<0){
            newCFG=0;
        }
        if(!newCFG){
            newCFG=0;
        }
        setCFG(newCFG);
    }

    return (
        <>
            <Grid container item xs={12}>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <FileUploader handleChange={setInputFile} types={['txt']}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant='standard' size='string' label='Job Name' value={inputJobName} inputProps={inputFieldProps} onChange={(e)=>{setInputJobName(e.target.value)}} sx={jobNameInputStyle}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant='standard' size='string' label='Steps' value={steps} inputProps={inputFieldProps} onChange={(e)=>{setSteps(e.target.value)}} onBlur={()=>{handleStepsInput(steps)}} sx={jobNameInputStyle}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant='standard' size='string' label='CFG' value={cfg} inputProps={inputFieldProps} onChange={(e)=>{setCFG(e.target.value)}} onBlur={()=>{handleCFGInput(cfg)}} sx={jobNameInputStyle}/>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel label='HR fix' control={
                        <Checkbox checked={hrFix} onChange={()=>{setHRFix(!hrFix)}}/>
                    }/>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel label='Restore face' control={
                        <Checkbox checked={restoreFace} onChange={()=>{setRestoreFace(!restoreFace)}}/>
                    }/>
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={!inputFile} variant='contained' sx={buttonStyle} onClick={()=>{setInputFile()}}>
                        Clear file
                    </Button>
                    <Button disabled={!inputFile} variant='contained' onClick={sendBatchJob} sx={buttonStyle}>
                        Send
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} hidden={!inputFile}>
                {inputFile?inputFile.name:''}
            </Grid>
        </>
    )
}