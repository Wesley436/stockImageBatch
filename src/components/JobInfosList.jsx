import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';
import PageSelect from './PageSelect';

const inputFieldProps = {
    style: {
        textAlign:'start',
    },
}

const inputFieldStyle = {
    marginTop: '1rem',
    width: '100%',
}

export default function JobInfosList() {
    const {
        listJobs, jobInfos, checkJobStatus,
        jobListPage, setJobListPage,
        searchQuery, setSearchQuery,
        isJobsListLoading,
    } = useContext(StockImageContext);

    function handleKey(key){
        if(key === 'Enter'){
            listJobs();
        }
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={8}>
                <SectionLabel labelText='Jobs list'/>
            </Grid>
            <Grid item container xs={2}>
                <PageSelect jobListPage={jobListPage} setJobListPage={setJobListPage} listJobs={listJobs}/>
            </Grid>
            <Grid item xs={2}>
                <RefreshButton onRefresh={listJobs}/>
            </Grid>
            <TextField variant='standard' size='string' placeholder='Search' value={searchQuery} inputProps={inputFieldProps} onChange={(e)=>{setSearchQuery(e.target.value)}} onKeyDown={(e)=>{handleKey(e.key)}} sx={inputFieldStyle}/>
            <Grid item xs={12}>
                {isJobsListLoading
                    ?
                    <LoadingButton loading={true} sx={{width: '100%', height: '100%', scale: '3', marginTop: '3rem'}}/>
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