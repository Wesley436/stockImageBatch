import { Grid } from '@mui/material';
import CardContainer from './CardContainer';
import DallE from './DallE';
import TokenField from './TokenField';
import FileUpload from './FileUpload';
import JobInfosList from './JobInfosList';
import SelectedJobInfo from './SelectedJobInfo';
import '../styles/App.css';

export default function StockImageBatch() {
    return(
        <Grid container>
            <Grid item xs={12} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <DallE/>
                </CardContainer>
            </Grid>
            <Grid item xs={12} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <TokenField/>
                </CardContainer>
            </Grid>
            <Grid container item xs={12} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <FileUpload/>
                </CardContainer>
            </Grid>
            <Grid container item xs={6} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <JobInfosList/>
                </CardContainer>
            </Grid>
            <Grid container item xs={6} sx={{padding:'1rem'}}>
                <CardContainer left>
                    <SelectedJobInfo/>
                </CardContainer>
            </Grid>
        </Grid>
    )
}