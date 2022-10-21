import { Grid } from '@mui/material';
import JobInfoText from './JobInfoText';

const jobInfoStyle = {
    padding: '1rem',
    margin: '1rem',
    border: '0.1rem solid black',
    borderRadius: '1rem'
}

export default function JobInfo({jobInfo}) {
    return (
        <Grid item lg={5} sx={jobInfoStyle}>
            <JobInfoText text={'job id: ' + jobInfo.jobId}/>
            <JobInfoText text={'job status: ' + jobInfo.jobStatus}/>
            <JobInfoText text={'job file: '} href={jobInfo.jobFile}/>
            <JobInfoText text={'request at: ' + jobInfo.requestedAt}/>
            <JobInfoText text={'started at: ' + jobInfo.startedAt}/>
            <JobInfoText text={'finished at: ' + jobInfo.finishedAt}/>
            <JobInfoText text={'result url: '} href={jobInfo.resultUrl}/>
            <JobInfoText text={'remarks: ' + jobInfo.remarks}/>
        </Grid>
    )
}