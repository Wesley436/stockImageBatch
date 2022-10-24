import { Card, CardContent } from '@mui/material';

const cardContainerStyle = {
    width:'100%',
    boxShadow: 8,
    borderRadius: '1rem',
    padding: '1rem',
}

export default function CardContainer({left, children}) {
    return (
        <Card sx={cardContainerStyle}>
            <CardContent sx={left?{textAlign:'left'}:{}}>
                {children}
            </CardContent>
        </Card>
    )
}