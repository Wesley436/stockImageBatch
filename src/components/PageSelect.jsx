import { useRef } from 'react';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const arrowStyle = {
    scale: '1.5',
    marginTop: '0.5rem',
    cursor: 'pointer',
}

export default function PageSelect({jobListPage, setJobListPage, listJobs}) {
    const pageFieldRef = useRef(null);

    const pageFieldProps = {
        ref: pageFieldRef
    }

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

    function incrementPage(amount) {
        handlePageInput(jobListPage + amount);
    }

    function handleKey(key){
        if(key === 'Enter'){
            listJobs();
            pageFieldRef.current.blur();
        }
    }

    return (
        <>
            <TextField variant="outlined" label="Page" type="tel" value={jobListPage} onChange={(e)=>{handlePageInput(e.target.value)}} inputProps={pageFieldProps} onBlur={()=>listJobs()} onKeyDown={(e)=>{handleKey(e.key)}} sx={{minWidth:'4rem'}}/>
            <Grid item xs={6}>
                <ArrowBackIcon sx={arrowStyle} onClick={()=>incrementPage(-1)}/>
            </Grid>
            <Grid item xs={6}>
                <ArrowForwardIcon sx={arrowStyle} onClick={()=>incrementPage(1)}/>
            </Grid>
        </>
    )
}