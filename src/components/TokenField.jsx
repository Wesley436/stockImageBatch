import { TextField } from '@mui/material';
import SectionLabel from './SectionLabel';

const inputFieldProps = {
    style: {
        textAlign:'start',
        fontSize:'1.5rem',
    }
}

export default function TokenField({token, setToken}) {
    return (
        <>
            <SectionLabel labelText='Token'/>
            <TextField variant='standard' size='string' value={token} onChange={(e)=>{setToken(e.target.value)}} inputProps={inputFieldProps}/>
        </>
    )
}