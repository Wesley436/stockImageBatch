import { Typography } from '@material-ui/core';

export default function SectionLabel({labelText}) {
    return (
        <Typography variant='h3' align='left'>
            {labelText}
        </Typography>
    )
}