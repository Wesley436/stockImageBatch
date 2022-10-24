import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';
import { Grid } from '@mui/material';

export default function SelectedJobInfo({selectedJobInfo, refreshJobDetails}) {
    return (
        <Grid container>
            <Grid item lg={11}>
                <SectionLabel labelText='Job details'/>
            </Grid>
            <Grid item lg={1}>
                <RefreshButton onRefresh={refreshJobDetails}/>
            </Grid>
            {selectedJobInfo?<JobInfo jobInfo={selectedJobInfo} detailedInfo={true}/>:<></>}
        </Grid>
    )
}