import { Typography } from '@material-ui/core';
import { Box } from '@mui/material';

const sectionLabel = {
    width: 'fit-content',
    padding:'0.25rem 1rem',
    borderRadius: '1rem',
    margin: '0rem 0rem 1rem 0rem',
}

export default function SectionLabel({labelText}) {
    return (
        <Box component={Typography} boxShadow={3} sx={sectionLabel}>
            <Typography component={'span'} align='left'>
                {labelText}
            </Typography>
        </Box>
    )
}