import { Grid, TextField, Button } from '@mui/material';
import '../styles/App.css';
import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import JobInfo from './JobInfo';
import { FileUploader } from 'react-drag-drop-files';

const buttonStyle = {
    margin: '1rem',
}

export default function StockImageBatch() {
    const {
        token, setToken,
        inputFile, setInputFile,
        sendBatchJob,
        jobInfos,
        selectedJobInfo,
        listJobs,
    } = useContext(StockImageContext);

    return(
        <Grid container>
            <Grid item lg={12} sx={{display: 'flex', justifyContent: 'left', padding:'1rem'}}>
                <TextField placeholder={'token'} varient='outlined' value={token} onChange={(e)=>{setToken(e.target.value)}}/>
            </Grid>
            <Grid container item lg={12} sx={{padding:'1rem'}}>
                <Grid container item lg={12}>
                    <Grid item lg={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <FileUploader handleChange={setInputFile} types={['txt']}/>
                    </Grid>
                    <Grid item lg={12}>
                        <Button disabled={!inputFile} variant='contained' sx={buttonStyle} onClick={()=>{setInputFile()}}>
                            Clear file
                        </Button>
                        <Button disabled={!inputFile} variant='contained' onClick={sendBatchJob} sx={buttonStyle}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
                <Grid item lg={12} hidden={!inputFile}>
                    {inputFile?inputFile.name:''}
                </Grid>
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                <Grid item lg={12}>
                    <Button variant='contained' onClick={listJobs} sx={buttonStyle}>
                        List jobs
                    </Button>
                </Grid>
                {jobInfos.slice().reverse().map((jobInfo, i) => {
                    return(
                        <JobInfo key={i} jobInfo={jobInfo}/>
                    )
                })}
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                {selectedJobInfo?<JobInfo jobInfo={selectedJobInfo} detailedInfo={true}/>:<></>}
            </Grid>
        </Grid>
    )
}