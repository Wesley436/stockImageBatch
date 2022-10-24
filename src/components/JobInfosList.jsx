import { Grid, Button } from '@mui/material';
import JobInfo from './JobInfo';
import { Card, CardContent } from '@mui/material';

const buttonStyle = {
    margin: '1rem',
}

export default function JobInfosList({listJobs, jobInfos, checkJobStatus}) {
    return (
        <Card sx={{width:'100%', boxShadow: 16, borderRadius: '1rem'}}>
            <CardContent>
                <Grid item lg={12}>
                    <Button variant='contained' onClick={listJobs} sx={buttonStyle}>
                        List jobs
                    </Button>
                </Grid>
                {jobInfos.slice().reverse().map((jobInfo, i) => {
                    return(
                        <JobInfo key={i} jobInfo={jobInfo} checkJobStatus={checkJobStatus}/>
                    )
                })}
            </CardContent>
        </Card>
    )
}