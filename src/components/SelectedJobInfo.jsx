import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function SelectedJobInfo() {
    const {
        selectedJobInfo,
        checkJobStatus,
        isJobInfoLoading,
    } = useContext(StockImageContext);

    return (
        <Grid container>
            <Grid item xs={10}>
                <SectionLabel labelText='Job details'/>
            </Grid>
            <Grid item xs={2}>
                <RefreshButton onRefresh={()=>{if(selectedJobInfo){checkJobStatus(selectedJobInfo.jobId)}}}/>
            </Grid>
            {isJobInfoLoading
                ?
                <LoadingButton loading={true} sx={{width: '100%', height: '100%', scale: '3', marginTop: '4rem'}}/>
                :
                selectedJobInfo?<JobInfo jobInfo={selectedJobInfo} detailedInfo={true}/>:<></>
            }

        </Grid>
    )
}