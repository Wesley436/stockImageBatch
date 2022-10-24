import { createContext, useState } from 'react';
import axios from 'axios';

export const StockImageContext = createContext();

export default function StockImageContextProvider(props) {
    const [token, setToken] = useState([]);
    const [inputFile, setInputFile] = useState();
    const [jobInfos, setJobInfos] = useState([]);

    const [selectedJobInfo, setSelectedJobInfo] = useState();

    // const batchRequestURL = 'http://localhost:3001';
    const batchRequestURL = 'https://bxrlwa1tjl.execute-api.us-east-1.amazonaws.com';

    function checkJobStatus(jobId) {
        let formData = new FormData();
        formData.append('token', token);
        formData.append('job_id', jobId);

        const index = jobInfos.findIndex(jobInfo => jobInfo.jobId === jobId);

        axios({
            method: 'post',
            url: batchRequestURL+'/fetchJob',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
        })
        .then(response => {
            return response.data;
        })
        .then(json => {
            let response = json.response;
            let updatingJobInfo = [...jobInfos][index];
            if (json.success){
                updatingJobInfo.jobFile = response.job_file;
                updatingJobInfo.jobStatus = response.job_status;
                updatingJobInfo.finishedAt = response.finished_at;
                updatingJobInfo.resultUrl = response.result_url;
                updatingJobInfo.remarks = response.remarks;
                updatingJobInfo.jobStatus = response.job_status;
                updatingJobInfo.startedAt = response.started_at;
            }else {
                console.log(response.message);
                updatingJobInfo.jobStatus = 'error';
            }
            const updatingJobInfos = jobInfos.map((jobInfo, i)=>{
                if(i === index){
                    return updatingJobInfo;
                }else{
                    return jobInfo;
                }
            })
            setSelectedJobInfo(updatingJobInfo);
            setJobInfos(updatingJobInfos);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function sendBatchJob(){
        let formData = new FormData();
        formData.append('token', token);
        formData.append('job_file', inputFile);
        setInputFile();

        let newJobInfo = {};
        newJobInfo.jobStatus = 'starting';
        axios({
            method: 'post',
            url: batchRequestURL+'/requestJob',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
        })
        .then(response => {
            return response.data;
        })
        .then(json => {
            let response = json.response;
            if(json.success){
                newJobInfo.jobId = response.job_id;
                setJobInfos([...jobInfos, newJobInfo]);
            }else{
                console.log(response.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    function listJobs (){
        let formData = new FormData();
        formData.append('token', token);

        axios({
            method: 'post',
            url: batchRequestURL+'/listJobs',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
        })
        .then(response => {
            return response.data;
        })
        .then(json => {
            let response = json.response
            if(json.success){
                let latestJobInfos = [...jobInfos];
                response.job_list.forEach((job) => {
                    const index = latestJobInfos.findIndex(jobInfo => jobInfo.jobId === job.job_id);
                    if(index !== -1){
                        latestJobInfos[index].jobStatus = job.job_status;
                    }else {
                        let latestJobInfo = {};
                        latestJobInfo.jobId = job.job_id;
                        latestJobInfo.requestedAt = job.requested_at;
                        latestJobInfo.jobStatus = job.job_status;
                        latestJobInfos = [...latestJobInfos, latestJobInfo]
                    }
                })
                setJobInfos(latestJobInfos);
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
                token, setToken,
                inputFile, setInputFile,
                sendBatchJob,
                jobInfos, setJobInfos,
                selectedJobInfo, setSelectedJobInfo,
                listJobs,
                checkJobStatus,
            }}
        >
            {props.children}
        </StockImageContext.Provider>
    );
}