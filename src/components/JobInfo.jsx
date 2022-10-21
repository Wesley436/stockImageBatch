import { Grid } from '@mui/material';
import JobInfoText from './JobInfoText';

export default function JobInfo({jobInfo}) {
    return (
        <Grid item lg={6}>
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