import { Grid, Button } from '@mui/material';
import JobInfoText from './JobInfoText';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { useContext } from 'react';

const jobInfoStyle = {
    padding: '1rem',
    marginBottom: '1rem',
    border: '0.1rem solid black',
    borderRadius: '1rem',
    height: 'auto'
}

export default function JobInfo({jobInfo, detailedInfo}) {
    const {
        checkJobStatus
    } = useContext(StockImageContext);
    return (
        <Grid container item lg={12} sx={jobInfoStyle}>
            <Grid item lg={10}>
                <JobInfoText hidden={!jobInfo.jobId} text={'job id: ' + jobInfo.jobId}/>
                <JobInfoText hidden={!jobInfo.jobStatus} text={'job status: ' + jobInfo.jobStatus}/>
                <JobInfoText hidden={!jobInfo.jobFile||!detailedInfo} text={'job file: '} href={jobInfo.jobFile}/>
                <JobInfoText hidden={!jobInfo.requestedAt} text={'request at: ' + jobInfo.requestedAt}/>
                <JobInfoText hidden={!jobInfo.startedAt||!detailedInfo} text={'started at: ' + jobInfo.startedAt}/>
                <JobInfoText hidden={!jobInfo.finishedAt||!detailedInfo} text={'finished at: ' + jobInfo.finishedAt}/>
                <JobInfoText hidden={!jobInfo.resultUrl||!detailedInfo} text={'result url: '} href={jobInfo.resultUrl}/>
                <JobInfoText hidden={!jobInfo.remarks||!detailedInfo} text={'remarks: ' + jobInfo.remarks}/>
            </Grid>
            <Grid item lg={2} hidden={detailedInfo}>
                <Button variant='contained' onClick={()=>{checkJobStatus(jobInfo.jobId)}}>Fetch</Button>
            </Grid>
        </Grid>
    )
}