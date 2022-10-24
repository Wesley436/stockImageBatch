import RefreshIcon from '@mui/icons-material/Refresh';

const refreshIconStyle = {
    scale: '4',
    padding: '0.6rem 0rem 0rem 0rem',
    cursor: 'pointer',
}

export default function RefreshButton({onRefresh}) {
    return (
        <RefreshIcon sx={refreshIconStyle} onClick={onRefresh}/>
    )
}