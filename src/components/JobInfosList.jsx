import { Grid } from '@mui/material';
import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';

export default function JobInfosList({listJobs, jobInfos, checkJobStatus}) {
    return (
        <Grid container>
            <Grid item lg={11}>
                <SectionLabel labelText='Jobs list'/>
            </Grid>
            <Grid item lg={1}>
                <RefreshButton onRefresh={listJobs}/>
            </Grid>
            {jobInfos.slice().reverse().map((jobInfo, i) => {
                return(
                    <JobInfo key={i} jobInfo={jobInfo} checkJobStatus={checkJobStatus}/>
                )
            })}
        </Grid>
    )
}