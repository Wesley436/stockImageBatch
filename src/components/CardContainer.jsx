import { Card, CardContent } from '@mui/material';

const cardContainerStyle = {
    width:'100%',
    boxShadow: 8,
    borderRadius: '1rem',
    padding:'0rem',
}

export default function CardContainer({left, children}) {
    return (
        <Card sx={cardContainerStyle}>
            <CardContent sx={left?{textAlign:'left', padding: '1rem 1rem'}:{}}>
                {children}
            </CardContent>
        </Card>
    )
}