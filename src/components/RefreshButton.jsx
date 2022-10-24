import { Grid, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const buttonStyle = {
    height: '2rem',
    color: '#555',
    backgroundColor: '#FFF',
    borderColor: 'transparent',
    borderRadius: '1rem',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#FFF',
        borderColor: 'transparent',
    },
}

const refreshIconStyle = {
    scale: '2',
    padding: '0.2rem 0rem',
}

export default function RefreshButton({onRefresh}) {
    return (
        <Grid item lg={1}>
            <Button variant='contained' onClick={onRefresh} sx={buttonStyle}>
                <RefreshIcon sx={refreshIconStyle}/>
            </Button>
        </Grid>
    )
}