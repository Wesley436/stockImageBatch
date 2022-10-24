import { TextField } from '@mui/material';
import SectionLabel from './SectionLabel';

export default function TokenField({token, setToken}) {
    return (
        <>
            <SectionLabel labelText='Token'/>
            <TextField variant='standard' value={token} onChange={(e)=>{setToken(e.target.value)}}/>
        </>
    )
}