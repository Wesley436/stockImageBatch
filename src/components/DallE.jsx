import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FileUploader } from 'react-drag-drop-files';
import SectionLabel from './SectionLabel';

import { Configuration, OpenAIApi } from "openai";

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
    const [requestType, setRequestType] = useState('generations');

    const [openAIToken, setOpenAIToken] = useState('');
    const [processing, setProcessing] = useState(false);
    const [generatedImageUrls, setGeneratedImageUrls] = useState([]);
    const [inputPrompt, setInputPrompt] = useState('');
    const [n, setN] = useState(1);
    const [size, setSize] = useState('512x512');

    const [uploadedImage, setUploadedImage] = useState('');
    const [uploadedMask, setUploadedMask] = useState('');

    async function dallERequest (){
        setProcessing(true);
        const configuration = new Configuration({
            apiKey: openAIToken,
        });
        const openai = new OpenAIApi(configuration);
        let response
        switch (requestType) {
            case 'generations':
                response = await openai.createImage({
                    'prompt': inputPrompt,
                    'n': parseInt(n),
                    'size': size,
                    'response_format': 'url',
                });
                break;
            case 'edits':
                response = await openai.createImage({
                    'image': uploadedImage,
                    'mask': uploadedMask,
                    'prompt': inputPrompt,
                    'n': parseInt(n),
                    'size': size,
                    'response_format': 'url',
                });
                break;
            case 'variations':
                response = await openai.createImage({
                    'image': uploadedImage,
                    'n': parseInt(n),
                    'size': size,
                    'response_format': 'url',
                });
                break;
            default:
                setProcessing(false);
                return;
        }

        console.log(response.data.data);
        setGeneratedImageUrls(response.data.data);
        setProcessing(false);
    }

    return (
        <>
            <SectionLabel labelText='DallE'/>
            <Grid container item xs={12}>
                <Grid container item xs={6}>
                    <div>
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <Select value={requestType} onChange={(e)=>{setRequestType(e.target.value)}}>
                                <MenuItem key={1} value={'generations'}>
                                    Generations
                                </MenuItem>
                                <MenuItem key={2} value={'edits'}>
                                    Edits
                                </MenuItem>
                                <MenuItem key={3} value={'variations'}>
                                    Variations
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <TextField variant='standard' size='string' placeholder='OpenAI token' value={openAIToken} onChange={(e)=>{setOpenAIToken(e.target.value)}} inputProps={inputFieldProps}/>
                        </Grid>
                        {requestType !== 'edits'
                        ?
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <TextField variant='standard' size='string' placeholder='Prompt' value={inputPrompt} inputProps={inputFieldProps} onChange={(e)=>{setInputPrompt(e.target.value)}} sx={jobNameInputStyle}/>
                        </Grid>
                        :
                        <></>
                        }
                        <Grid item xs={12} sx={{textAlign:'left'}}>
                            <TextField variant='standard' size='string' type='number' placeholder='Number of images' value={n} inputProps={inputFieldProps} onChange={(e)=>{setN(e.target.value)}} sx={jobNameInputStyle}/>
                        </Grid>
                        {requestType === 'variations' || requestType === 'edits'
                        ?
                        <>
                            <>
                                <SectionLabel labelText='Image' variant='h5'/>
                                <Grid item xs={12} sx={{textAlign:'left'}}>
                                    <FileUploader handleChange={setUploadedImage} types={['png']}/>
                                </Grid>
                            </>
                            {requestType === 'edits'
                            ?
                            <>
                                <SectionLabel labelText='Mask' variant='h5'/>
                                <Grid item xs={12} sx={{textAlign:'left'}}>
                                    <FileUploader handleChange={setUploadedMask} types={['png']}/>
                                </Grid>
                            </>
                            :
                            <></>
                            }
                        </>
                        :
                        <></>
                        }
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
                            <Button disabled={processing||(!openAIToken||!inputPrompt||!n||!size)} variant='contained' sx={buttonStyle} onClick={()=>{dallERequest()}}>
                                Generate
                            </Button>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {processing
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