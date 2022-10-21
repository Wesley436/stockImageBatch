import { Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
import Link from '@mui/material/Link';

export default function JobInfoText({text, href}) {
    return (
        <Grid item lg={12}>
            <Typography align='left'>
                {href
                    ?   <>
                            {text}
                            <Link href={href}>
                                {href}
                            </Link>
                        </>
                    :   text
                }
            </Typography>
        </Grid>
    )
}