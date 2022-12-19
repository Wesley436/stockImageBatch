import { Typography } from '@material-ui/core';

export default function SectionLabel({labelText, variant='h3'}) {
    return (
        <Typography variant={variant} align='left'>
            {labelText}
        </Typography>
    )
}