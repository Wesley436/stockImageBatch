import { Grid } from '@mui/material';
import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';

export default function JobInfosList({listJobs, jobInfos, checkJobStatus}) {
    return (
        <Grid container>
            <Grid item lg={2}>
                <SectionLabel labelText='Jobs list'/>
            </Grid>
            <RefreshButton onRefresh={listJobs}/>
            {jobInfos.slice().reverse().map((jobInfo, i) => {
                return(
                    <JobInfo key={i} jobInfo={jobInfo} checkJobStatus={checkJobStatus}/>
                )
            })}
        </Grid>
    )
}