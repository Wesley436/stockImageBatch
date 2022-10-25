import { useContext, useRef } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import JobInfo from './JobInfo';
import SectionLabel from './SectionLabel';
import RefreshButton from './RefreshButton';

const arrowStyle = {
    scale: '1.5',
    marginTop: '0.5rem',
    cursor: 'pointer',
}

const inputFieldProps = {
    style: {
        textAlign:'start',
    },
}

const inputFieldStyle = {
    marginTop: '1rem',
    width: '100%',
}

export default function JobInfosList({listJobs, jobInfos, checkJobStatus}) {
    const {
        jobListPage, setJobListPage,
        searchQuery, setSearchQuery,
        isJobsListLoading,
    } = useContext(StockImageContext);

    const pageFieldRef = useRef(null);

    function handlePageInput(page) {
        let targetPage = parseInt(page);
        if(targetPage<0){
            targetPage=0;
        }
        if(!targetPage){
            targetPage=0;
        }
        setJobListPage(targetPage);
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

    function incrementPage(amount) {
        handlePageInput(jobListPage + amount);
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={8}>
                <SectionLabel labelText='Jobs list'/>
            </Grid>
            <Grid item container xs={2}>
                <TextField variant="outlined" label="Page" type="tel" value={jobListPage} onChange={(e)=>{handlePageInput(e.target.value)}} inputProps={pageFieldProps} onBlur={()=>listJobs()} onKeyDown={(e)=>{handleKey(e.key)}} sx={{minWidth:'4rem'}}/>
                <Grid item xs={6}>
                    <ArrowBackIcon sx={arrowStyle} onClick={()=>incrementPage(-1)}/>
                </Grid>
                <Grid item xs={6}>
                    <ArrowForwardIcon sx={arrowStyle} onClick={()=>incrementPage(1)}/>
                </Grid>
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