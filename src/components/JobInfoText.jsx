import { Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
import Link from '@mui/material/Link';

const textStyle = {
    wordBreak: 'break-word',
    textAlign: 'left',
}

export default function JobInfoText({text, href, hidden}) {
    return (
        <Grid item lg={12} hidden={hidden}>
            <Typography component={'span'} sx={textStyle}>
                {href
                    ?   <div style={textStyle}>
                            {text}
                            <Link href={href}>
                                {href}
                            </Link>
                        </div>
                    :   <div style={textStyle}>
                            {text}
                        </div>
                }
            </Typography>
        </Grid>
    )
}