import { useContext } from 'react';
import { StockImageContext } from '../context/StockImageBatchContextProvider';
import { Grid, Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SectionLabel from './SectionLabel';

const buttonStyle = {
    margin: '2rem',
    fontSize: '1.5rem',
}

const jobNameInputStyle = {
    marginTop: '1rem',
    minWidth: '20rem',
}

const inputFieldProps = {
    style: {
        textAlign:'start',
    },
}

export default function FileUpload() {
    const {
        openAIToken, setOpenAIToken,
        inputPrompt, setInputPrompt,
        n, setN,
        size, setSize,
        dallERequest,
        generating,
        generatedImageUrls,
    } = useContext(StockImageContext);
    return (
        <>
            <SectionLabel labelText='DallE'/>
            <Grid container item xs={12}>
                <Grid container item xs={6}>
                    <div>
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <TextField variant='standard' size='string' placeholder='OpenAI token' value={openAIToken} onChange={(e)=>{setOpenAIToken(e.target.value)}} inputProps={inputFieldProps}/>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <TextField variant='standard' size='string' placeholder='Prompt' value={inputPrompt} inputProps={inputFieldProps} onChange={(e)=>{setInputPrompt(e.target.value)}} sx={jobNameInputStyle}/>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <TextField variant='standard' size='string' type='number' placeholder='Number of images' value={n} inputProps={inputFieldProps} onChange={(e)=>{setN(e.target.value)}} sx={jobNameInputStyle}/>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign:'left', margin: '1rem 0rem'}}>
                            <Select value={size} onChange={(e)=>{setSize(e.target.value)}}>
                                <MenuItem key={1} value={'256x256'}>
                                    256x256
                                </MenuItem>
                                <MenuItem key={2} value={'512x512'}>
                                    512x512
                                </MenuItem>
                                <MenuItem key={3} value={'1024x1024'}>
                                    1024x1024
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <Button disabled={generating||(!openAIToken||!inputPrompt||!n||!size)} variant='contained' sx={buttonStyle} onClick={()=>{dallERequest()}}>
                                Generate
                            </Button>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {generating
                    ?
                    <LoadingButton loading={true} sx={{width: '100%', height: '100%', scale: '3'}}/>
                    :
                    generatedImageUrls.map((url, i) => {
                        return(
                            <div key={i}>
                                <a href={url.url}><img alt={'result ' + i} src={url.url}></img></a>
                            </div>
                        )
                    })
                    }
                </Grid>
            </Grid>
        </>
    )
}