import { Grid } from '@mui/material';
import '../styles/App.css';
import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import TokenField from './TokenField';
import FileUpload from './FileUpload';
import JobInfosList from './JobInfosList';
import SelectedJobInfo from './SelectedJobInfo';

export default function StockImageBatch() {
    const {
        token, setToken,
        inputFile, setInputFile,
        sendBatchJob,
        checkJobStatus,
        jobInfos,
        selectedJobInfo,
        listJobs,
    } = useContext(StockImageContext);

    return(
        <Grid container>
            <Grid item lg={12} sx={{padding:'1rem', borderRadius:'50px'}}>
                <TokenField placeholder='token' token={token} setToken={setToken}/>
            </Grid>
            <Grid container item lg={12} sx={{padding:'1rem'}}>
                <FileUpload inputFile={inputFile} setInputFile={setInputFile} onSend={sendBatchJob}/>
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                <JobInfosList listJobs={listJobs} jobInfos={jobInfos} checkJobStatus={checkJobStatus}/>
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                <SelectedJobInfo selectedJobInfo={selectedJobInfo}/>
            </Grid>
        </Grid>
    )
}