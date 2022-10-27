import { Grid, Button } from '@mui/material';
import JobInfoText from './JobInfoText';

const jobInfoStyle = {
    padding: '1rem',
    margin: '2rem 1rem 1rem 1rem',
    border: '1ren solid black',
    borderRadius: '1rem',
    boxShadow: 8,
}

const fetchButtonStyle = {
    top: '10%',
    fontSize: '1rem',
}


export default function JobInfo({jobInfo, detailedInfo, checkJobStatus}) {
    return (
        <Grid container item xs={12} sx={jobInfoStyle}>
            <Grid item xs={9}>
                <JobInfoText hidden={!jobInfo.jobId} text={'job id: ' + jobInfo.jobId}/>
                <JobInfoText hidden={!jobInfo.jobName} text={'job name: ' + jobInfo.jobName}/>
                <JobInfoText hidden={!jobInfo.jobStatus} text={'job status: ' + jobInfo.jobStatus}/>
                <JobInfoText hidden={!jobInfo.jobFile||!detailedInfo} text={'job file: '} href={jobInfo.jobFile}/>
                <JobInfoText hidden={!jobInfo.requestedAt} text={'request at: ' + new Date(jobInfo.requestedAt*1000).toUTCString()}/>
                <JobInfoText hidden={!jobInfo.startedAt||!detailedInfo} text={'started at: ' + new Date(jobInfo.startedAt*1000).toUTCString()}/>
                <JobInfoText hidden={!jobInfo.finishedAt||!detailedInfo} text={'finished at: ' + new Date(jobInfo.finishedAt*1000).toUTCString()}/>
                <JobInfoText hidden={!jobInfo.resultUrl||!detailedInfo} text={'result url: '} href={jobInfo.resultUrl}/>
                <JobInfoText hidden={!jobInfo.remarks||!detailedInfo} text={'remarks: ' + jobInfo.remarks}/>
            </Grid>
            {!detailedInfo
                ?
                <Grid item xs={2}>
                    <Button variant='contained' onClick={()=>{checkJobStatus(jobInfo.jobId)}} sx={fetchButtonStyle}>Fetch</Button>
                </Grid>
                :
                <></>
            }
        </Grid>
    )
}