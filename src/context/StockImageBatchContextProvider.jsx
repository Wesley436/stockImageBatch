import { createContext, useState, useRef } from 'react';
import axios from 'axios';

export const StockImageContext = createContext();

export default function StockImageContextProvider(props) {
    const [inputFile, setInputFile] = useState();
    const [randomNumber, setRandomNumber] = useState();
    const [inputPrompts, setInputPrompts] = useState([]);

    const [jobInfos, setJobInfos] = useState([]);
    const jobInfosRef = useRef(jobInfos);
    jobInfosRef.current = jobInfos;

    const [listJobInterval, setListJobInterval] = useState();

    const batchRequestURL = 'http://localhost:3001';

    function checkJobStatus(jobId) {
        let formData = new FormData();
        formData.append('token', 'token');
        formData.append('job_id', jobId);

        const index = jobInfosRef.current.findIndex(jobInfo => jobInfo.jobId === jobId);
        axios.post(
            batchRequestURL+'/fetchJob',
            formData,
            {
                headers:{
                    "Content-type": "multipart/form-data",
                },
            }
        )
        .then(response => {
            return response.data;
        })
        .then(json => {
            let response = json.response;
            let updatingJobInfo = [...jobInfosRef.current][index];
            if (json.success){
                if(response.job_status === 'finished'){
                    clearInterval(updatingJobInfo.interval);
                    updatingJobInfo.jobFile = response.job_file;
                    updatingJobInfo.jobStatus = response.job_status;
                    updatingJobInfo.finishedAt = response.finished_at;
                    updatingJobInfo.resultUrl = response.result_url;
                    updatingJobInfo.remarks = response.remarks;
                }else if (response.job_status === 'pending'){
                    updatingJobInfo.jobStatus = response.job_status;
                    updatingJobInfo.startedAt = response.started_at;
                }
            }else {
                console.log(response.message);
                updatingJobInfo.jobStatus = 'error';
                clearInterval(updatingJobInfo.interval);
            }
            setRandomNumber(Math.floor(Math.random() * 9999));
            setJobInfos(jobInfosRef.current);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function sendBatchJob(){
        let formData = new FormData();
        formData.append('token', 'token');
        formData.append('job_file', inputFile);

        setInputFile();
        setInputPrompts([]);

        let newJobInfo = {};
        console.log(formData);
        newJobInfo.jobStatus = 'starting';
        axios.post(
            batchRequestURL+'/requestJob',
            formData,
            {
                headers:{
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
                newJobInfo.jobId = response.job_id;
                newJobInfo.interval = setInterval(function () {checkJobStatus(response.job_id)}, 5000);
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
        formData.append('token', 'token');

        axios.post(
            batchRequestURL+'/listJobs',
            formData,
            {
                headers:{
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
                jobInfos.forEach((jobInfo) => {
                    clearInterval(jobInfo.interval);
                    jobInfo.interval = '';
                })

                let latestJobInfos = [];
                response.job_list.forEach((job) => {
                    let latestJobInfo = {};
                    const index = jobInfos.findIndex(jobInfo => jobInfo.jobId === job.job_id);
                    if(index !== -1){
                        latestJobInfo = jobInfos[index];
                        latestJobInfo.jobStatus = job.job_status;
                    }else {
                        latestJobInfo.jobId = job.job_id;
                        latestJobInfo.requestedAt = job.requested_at;
                        latestJobInfo.jobStatus = job.job_status;
                    }
                    latestJobInfo.interval = setInterval(function () {checkJobStatus(latestJobInfo.jobId)}, 5000);
                    latestJobInfos = [...latestJobInfos, latestJobInfo]
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
                inputFile, setInputFile,
                inputPrompts, setInputPrompts,
                sendBatchJob,
                jobInfos, setJobInfos,
                listJobs,
                listJobInterval, setListJobInterval,
            }}
        >
            {props.children}
        </StockImageContext.Provider>
    );
}