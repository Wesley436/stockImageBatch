import { TextField } from '@mui/material';
import { Card, CardContent } from '@mui/material';

export default function TokenField({placeholder, token, setToken}) {
    return (
        <Card sx={{boxShadow: 16, borderRadius: '1rem'}}>
            <CardContent sx={{textAlign:'left'}}>
                <TextField placeholder={placeholder} varient='outlined' value={token} onChange={(e)=>{setToken(e.target.value)}}/>
            </CardContent>
        </Card>
    )
}