import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';
import { Grid } from '@mui/material';

export default function SelectedJobInfo({selectedJobInfo, refreshJobDetails}) {
    return (
        <Grid container>
            <Grid item lg={2}>
                <SectionLabel labelText='Job details'/>
            </Grid>
            <RefreshButton onRefresh={refreshJobDetails}/>
            {selectedJobInfo?<JobInfo jobInfo={selectedJobInfo} detailedInfo={true}/>:<></>}
        </Grid>
    )
}