import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';

export default function JobInfosList({listJobs, jobInfos, checkJobStatus}) {
    const {
        jobListPage, setJobListPage,
        isJobsListLoading,
    } = useContext(StockImageContext);

    function handlePageInput(e) {
        let page = parseInt(e.target.value);
        if(page<0){
            page=0;
        }
        if(!page){
            page=0;
        }
        setJobListPage(page);
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={9}>
                <SectionLabel labelText='Jobs list'/>
            </Grid>
            <Grid item xs={2}>
                <TextField variant="outlined" label="Page" type="tel" value={jobListPage} onChange={(e)=>{handlePageInput(e)}}/>
            </Grid>
            <Grid item xs={1}>
                <RefreshButton onRefresh={listJobs}/>
            </Grid>
            <Grid item xs={12}>
                {isJobsListLoading
                    ?
                    <LoadingButton loading={true} sx={{width: '100%', height: '100%', scale: '3'}}/>
                    :
                    jobInfos.slice().sort((jobA, jobB)=>{
                        if(jobA.jobId > jobB.jobId){
                            return -1;
                        }
                        if(jobB.jobId > jobA.jobId){
                            return 1;
                        }
                        return 0;
                    }).map((jobInfo, i) => {
                        return(
                            <JobInfo key={i} jobInfo={jobInfo} checkJobStatus={checkJobStatus}/>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}