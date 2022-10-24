import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { Grid } from '@mui/material';
import CardContainer from './CardContainer';
import TokenField from './TokenField';
import FileUpload from './FileUpload';
import JobInfosList from './JobInfosList';
import SelectedJobInfo from './SelectedJobInfo';
import '../styles/App.css';

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
                <CardContainer left>
                    <TokenField token={token} setToken={setToken}/>
                </CardContainer>
            </Grid>
            <Grid container item lg={12} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <FileUpload inputFile={inputFile} setInputFile={setInputFile} onSend={sendBatchJob}/>
                </CardContainer>
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <JobInfosList listJobs={listJobs} jobInfos={jobInfos} checkJobStatus={checkJobStatus}/>
                </CardContainer>
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <SelectedJobInfo selectedJobInfo={selectedJobInfo} refreshJobDetails={()=>{if(selectedJobInfo){checkJobStatus(selectedJobInfo.jobId)}}}/>
                </CardContainer>
            </Grid>
        </Grid>
    )
}