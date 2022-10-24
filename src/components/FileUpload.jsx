import { Grid, Button } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';

const buttonStyle = {
    margin: '2rem',
    fontSize: '1.5rem',
}

export default function FileUpload({inputFile, setInputFile, onSend}) {
    return (
        <>
            <Grid container item xs={12}>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <FileUploader handleChange={setInputFile} types={['txt']}/>
                </Grid>
                <Grid item xs={12}>
                    <Button disabled={!inputFile} variant='contained' sx={buttonStyle} onClick={()=>{setInputFile()}}>
                        Clear file
                    </Button>
                    <Button disabled={!inputFile} variant='contained' onClick={onSend} sx={buttonStyle}>
                        Send
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} hidden={!inputFile}>
                {inputFile?inputFile.name:''}
            </Grid>
        </>
    )
}