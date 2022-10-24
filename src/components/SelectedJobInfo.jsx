import JobInfo from './JobInfo';
import { Card, CardContent } from '@mui/material';

export default function SelectedJobInfo({selectedJobInfo}) {
    return (
        <Card sx={{width:'100%', boxShadow: 16, borderRadius: '1rem'}}>
            <CardContent>
                {selectedJobInfo?<JobInfo jobInfo={selectedJobInfo} detailedInfo={true}/>:<></>}
            </CardContent>
        </Card>
    )
}