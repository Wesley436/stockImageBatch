import { Button, Grid } from '@mui/material';
import { TextField, Typography } from '@material-ui/core';
import Link from '@mui/material/Link';
import '../styles/App.css';
import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';

export default function StockImageBatch() {
    const {
        setInputFile,
        inputPrompt, setInputPrompt,
        inputPrompts, setInputPrompts,
        sendBatchJob,
        jobFile,
        requestedAt,
        startedAt,
        finishedAt,
        resultUrl,
        remarks,
        resultImageLinks,
    } = useContext(StockImageContext);

    const readFile = e => {
        const file = e.target.files[0];
        setInputFile(file);
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const inputFileLines = reader.result.replace(/\t/g, '').replace(/\r/g, '').split('\n').filter(function(i){return i})
            setInputPrompts(inputFileLines);
        }
    }

    return(
        <Grid container>
            <Grid item lg={6} sx={{padding:'1rem'}}>
                {/* <TextField varient='outlined' value={inputPrompt} onChange={(e)=>{setInputPrompt(e.target.value)}}/>
                <Button disabled={!inputPrompt} variant='contained' onClick={()=>{setInputPrompts([...inputPrompts, inputPrompt]);setInputPrompt('');}}>Add</Button> */}
                <Button variant='contained' component='label'>
                    File
                    <input type='file' accept='.txt' hidden onChange={readFile}/>
                </Button>
                <Button disabled={!inputPrompts.length} variant='contained' onClick={() => {setInputFile();setInputPrompts([]);}}>
                    Clear file
                </Button>
                <Button disabled={!inputPrompts.length} variant='contained' onClick={sendBatchJob}>
                    Send
                </Button>
                {inputPrompts.map((prompt, i) => {
                    return(
                        <Typography key={i} align='left'>
                            {prompt}
                        </Typography>
                    )
                })}
            </Grid>
            <Grid item lg={6}>
                <Grid item lg={12}>
                    <Typography align='left'>
                        job file:
                        <Link href={jobFile}>
                            {jobFile}
                        </Link>
                    </Typography>
                </Grid>
                <Grid item lg={12}>
                    <Typography align='left'>
                        {'request at:' + requestedAt}
                    </Typography>
                </Grid>
                <Grid item lg={12}>
                    <Typography align='left'>
                        {'started at:' + startedAt}
                    </Typography>
                </Grid>
                <Grid item lg={12}>
                    <Typography align='left'>
                        {'finished at:' + finishedAt}
                    </Typography>
                </Grid>
                <Grid item lg={12}>
                    <Typography align='left'>
                        {'result url:' + resultUrl}
                    </Typography>
                </Grid>
                <Grid item lg={12}>
                    <Typography align='left'>
                        {'remarks:' + remarks}
                    </Typography>
                </Grid>
                {/* {resultImageLinks.map((resultImageLink, i) => {
                    return(
                        <Grid key={i} item lg={6}>
                            <img alt={resultImageLink?'Output':null} src={resultImageLink} style={{alignSelf: 'center', maxWidth: '512px', maxHeight: '512px', margin: '1rem'}}/>
                            <Typography align='center'>
                                {inputPrompts[i]}
                            </Typography>
                        </Grid>
                    )
                })} */}
            </Grid>
        </Grid>
    )
}