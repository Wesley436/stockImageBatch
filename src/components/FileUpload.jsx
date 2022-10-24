import { Grid, Button } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { Card, CardContent } from '@mui/material';

const buttonStyle = {
    margin: '1rem',
}

export default function FileUpload({inputFile, setInputFile, onSend}) {
    return (
        <Card sx={{width:'100%', boxShadow: 16, borderRadius: '1rem'}}>
            <CardContent>
                <Grid container item lg={12}>
                    <Grid item lg={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <FileUploader handleChange={setInputFile} types={['txt']}/>
                    </Grid>
                    <Grid item lg={12}>
                        <Button disabled={!inputFile} variant='contained' sx={buttonStyle} onClick={()=>{setInputFile()}}>
                            Clear file
                        </Button>
                        <Button disabled={!inputFile} variant='contained' onClick={onSend} sx={buttonStyle}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
                <Grid item lg={12} hidden={!inputFile}>
                    {inputFile?inputFile.name:''}
                </Grid>
            </CardContent>
        </Card>
    )
}