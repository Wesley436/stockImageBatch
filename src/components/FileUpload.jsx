import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { Grid, Button } from '@mui/material';
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

export default function FileUpload({inputFile, setInputFile, onSend}) {
    const {
        inputJobName, setInputJobName,
    } = useContext(StockImageContext);
    return (
        <>
            <Grid container item xs={12}>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <FileUploader handleChange={setInputFile} types={['txt']}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant='standard' size='string' placeholder='Job Name' value={inputJobName} inputProps={inputFieldProps} onChange={(e)=>{setInputJobName(e.target.value)}} sx={jobNameInputStyle}/>
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={!inputFile} variant='contained' sx={buttonStyle} onClick={()=>{setInputFile()}}>
                        Clear file
                    </Button>
                    <Button disabled={!inputFile} variant='contained' onClick={onSend} sx={buttonStyle}>
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