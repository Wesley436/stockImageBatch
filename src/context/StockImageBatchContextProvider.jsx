import { createContext, useState } from 'react';
import axios from 'axios';

export const StockImageContext = createContext();

export default function StockImageContextProvider(props) {
    const [inputFile, setInputFile] = useState();
    const [inputPrompt, setInputPrompt] = useState('');
    const [inputPrompts, setInputPrompts] = useState([]);
    const [jobId, setJobId] = useState('');
    const [jobFile, setJobFile] = useState('');
    const [requestedAt, setRequestedAt] = useState('');
    const [startedAt, setStartedAt] = useState('');
    const [finishedAt, setFinishedAt] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [remarks, setRemarks] = useState('');
    const [resultImageLinks, setResultImageLinks] = useState([]);

    const batchRequestURL = 'https://TEMP.execute-api.us-east-1.amazonaws.com';

    let batchingJobStatus;
    function checkJobStatus(jobId) {
        let formData = new FormData();
        formData.append('token', 'token');
        formData.append('job_id', jobId);
        axios.post(
            batchRequestURL+'/fetchJob',
            formData,
            {
                headers:{
                    "Authorization": "authorization",
                    "Content-type": "multipart/form-data",
                },
            }
        )
        .then(response => {
            return response.data;
        })
        .then(json => {
            let response = json.response;
            if (json.success){
                if(response.job_status === 'finished'){
                    clearInterval(batchingJobStatus);
                    clearTimeout(requestTimeout);
                    setJobFile(response.job_file);
                    setResultUrl(response.result_url);
                }else if (response.job_status === 'pending'){

                }
            }else {
                console.log(response.message);
                clearInterval(batchingJobStatus);
                clearTimeout(requestTimeout);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    let requestTimeout;
    function sendBatchJob(){
        let formData = new FormData();
        formData.append('token', 'token');
        formData.append('job_file', inputFile);
        axios.post(
            batchRequestURL+'/requestJob',
            formData,
            {
                headers:{
                    "Authorization": "authorization",
                    "Content-type": "multipart/form-data",
                },
            }
        )
        .then(response => {
            return response.data;
        })
        .then(json => {
            let response = json.response
            if(json.success){
                setJobId(response.job_id);
                batchingJobStatus = setInterval(function () {checkJobStatus(response.job_id)}, 1000);
            }else{
                console.log(response.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <StockImageContext.Provider
            value={{
                inputFile, setInputFile,
                inputPrompt, setInputPrompt,
                inputPrompts, setInputPrompts,
                sendBatchJob,
                jobId, setJobId,
                jobFile, setJobFile,
                requestedAt, setRequestedAt,
                startedAt, setStartedAt,
                finishedAt, setFinishedAt,
                resultUrl, setResultUrl,
                remarks, setRemarks,
                resultImageLinks, setResultImageLinks,
            }}
        >
            {props.children}
        </StockImageContext.Provider>
    );
}