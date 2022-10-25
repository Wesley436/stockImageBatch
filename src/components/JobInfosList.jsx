import { useContext, useRef } from 'react';
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

    const pageFieldRef = useRef(null);

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

    const pageFieldProps = {
        ref: pageFieldRef
    }

    function handleKey(key){
        if(key === 'Enter'){
            listJobs();
            pageFieldRef.current.blur();
        }
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={8}>
                <SectionLabel labelText='Jobs list'/>
            </Grid>
            <Grid item xs={2}>
                <TextField variant="outlined" label="Page" type="tel" value={jobListPage} onChange={(e)=>{handlePageInput(e)}} inputProps={pageFieldProps} onBlur={()=>listJobs()} onKeyDown={(e)=>{handleKey(e.key)}}/>
            </Grid>
            <Grid item xs={2}>
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