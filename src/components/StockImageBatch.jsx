import { Button, Grid } from '@mui/material';
import '../styles/App.css';
import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import JobInfo from './JobInfo';
import { TextField } from '@mui/material';

const buttonStyle = {
    margin: '1rem',
}

// const promptTextStyle = {
//     marginBottom: '1rem',
//     textAlign: 'left',
//     whiteSpace: 'nowrap',
//     overflow: 'scroll',
//     overflowX: 'auto',
//     overflowY: 'hidden',
// }

export default function StockImageBatch() {
    const {
        token, setToken,
        inputFile, setInputFile,
        // inputPrompts, setInputPrompts,
        sendBatchJob,
        jobInfos,
        selectedJobInfo,
        listJobs,
    } = useContext(StockImageContext);

    const readFile = e => {
        const file = e.target.files[0];
        setInputFile(file);

        // const reader = new FileReader();
        // reader.readAsText(file);
        // reader.onload = () => {
        //     const inputFileLines = reader.result.replace(/\t/g, '').replace(/\r/g, '').split('\n').filter(function(i){return i});
        //     setInputPrompts(inputFileLines);
        // }
    }

    return(
        <Grid container>
            <Grid item lg={12} sx={{padding:'1rem'}}>
                <TextField placeholder={'token'} varient='outlined' value={token} onChange={(e)=>{setToken(e.target.value)}}/>
            </Grid>
            <Grid container item lg={12} sx={{padding:'1rem'}}>
                <Grid item lg={12}>
                    <Button variant='contained' component='label' sx={buttonStyle}>
                        Upload file
                        <input type='file' accept='.txt' hidden onChange={readFile}/>
                    </Button>
                    <Button disabled={!inputFile} variant='contained' sx={buttonStyle} onClick={() => {
                            setInputFile();
                            // setInputPrompts([]);
                        }}>
                        Clear file
                    </Button>
                    <Button disabled={!inputFile} variant='contained' onClick={sendBatchJob} sx={buttonStyle}>
                        Send
                    </Button>
                </Grid>
                <Grid item lg={12} hidden={!inputFile}>
                    {inputFile?inputFile.name:''}
                </Grid>
                {/* {inputPrompts.map((prompt, i) => {
                    return(
                        <div key={i} style={{textAlign: 'left'}}>
                            {i+1 + ':   '}
                            <p style={promptTextStyle}>
                                {prompt}
                            </p>
                        </div>
                    )
                })} */}
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                <Grid item lg={12}>
                    <Button variant='contained' onClick={()=>{listJobs();}} sx={buttonStyle}>
                        List jobs
                    </Button>
                </Grid>
                {jobInfos.slice().reverse().map((jobInfo, i) => {
                    return(
                        <JobInfo key={i} jobInfo={jobInfo}/>
                    )
                })}
            </Grid>
            <Grid container item lg={6} sx={{padding:'1rem'}}>
                {selectedJobInfo?<JobInfo jobInfo={selectedJobInfo} detailedInfo={true}/>:<></>}
            </Grid>
        </Grid>
    )
}