import { createContext, useState, useRef } from 'react';
import axios from 'axios';

export const StockImageContext = createContext();

export default function StockImageContextProvider(props) {
    const [token, setToken] = useState([]);
    const [inputFile, setInputFile] = useState();
    const [jobListPage, setJobListPage] = useState(0);
    const [isJobsListLoading, setIsJobsListLoading] = useState(false);
    const [jobInfos, setJobInfos] = useState([]);
    const jobInfosRef = useRef(jobInfos);
    jobInfosRef.current = jobInfos;

    const [isJobInfoLoading, setIsJobInfoLoading] = useState(false);
    const [selectedJobInfo, setSelectedJobInfo] = useState();

    const [errorMessage, setErrorMessage] = useState();

    // const batchRequestURL = 'http://localhost:3001';
    const batchRequestURL = 'https://bxrlwa1tjl.execute-api.us-east-1.amazonaws.com';

    function getErrorMessage (action, message){
        return '<'+new Date().toUTCString()+'> '+action+' failed: '+message
    }

    function checkJobStatus(jobId) {
        let formData = new FormData();
        formData.append('token', token);
        formData.append('job_id', jobId);

        const index = jobInfosRef.current.findIndex(jobInfo => jobInfo.jobId === jobId);

        setIsJobInfoLoading(true);
        setErrorMessage('');
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
            let updatingJobInfo = [...jobInfosRef.current][index];
            if (json.success){
                setErrorMessage('');
                updatingJobInfo.jobFile = response.job_file;
                updatingJobInfo.jobStatus = response.job_status;
                updatingJobInfo.finishedAt = response.finished_at;
                updatingJobInfo.resultUrl = response.result_url;
                updatingJobInfo.remarks = response.remarks;
                updatingJobInfo.jobStatus = response.job_status;
                updatingJobInfo.startedAt = response.started_at;
                const updatingJobInfos = jobInfosRef.current.map((jobInfo, i)=>{
                    if(i === index){
                        return updatingJobInfo;
                    }else{
                        return jobInfo;
                    }
                })
                setJobInfos(updatingJobInfos);
                setSelectedJobInfo(updatingJobInfo);
            }else {
                setErrorMessage(getErrorMessage('Fetch job', response.message));
                setJobInfos([]);
                setSelectedJobInfo();
            }
            setIsJobInfoLoading(false);
        })
        .catch(err => {
            setErrorMessage(getErrorMessage('Fetch job', err));
            setIsJobInfoLoading(false);
        })
    }

    function sendBatchJob(){
        let formData = new FormData();
        formData.append('token', token);
        formData.append('job_file', inputFile);
        setInputFile();

        let newJobInfo = {};
        newJobInfo.jobStatus = 'starting';
        setIsJobsListLoading(true);
        setErrorMessage('');
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
                newJobInfo.requestedAt = response.requested_at;
                setJobInfos([...jobInfos, newJobInfo])
                setTimeout(() => {
                    checkJobStatus(response.job_id);
                }, 1000);
            }else{
                setErrorMessage(getErrorMessage('Request job', response.message));
                setJobInfos([]);
                setSelectedJobInfo();
            }
            setIsJobsListLoading(false);
        })
        .catch(err => {
            setErrorMessage(getErrorMessage('Request job', err));
            setIsJobsListLoading(false);
        })
    }

    function listJobs (){
        let formData = new FormData();
        formData.append('token', token);
        formData.append('page', jobListPage);

        setIsJobsListLoading(true);
        setErrorMessage('');
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
                setErrorMessage('');
                let latestJobInfos = [];
                response.job_list.forEach((job) => {
                    let latestJobInfo = {};
                    latestJobInfo.jobId = job.job_id;
                    latestJobInfo.requestedAt = job.requested_at;
                    latestJobInfo.jobStatus = job.job_status;
                    latestJobInfos = [...latestJobInfos, latestJobInfo]
                })
                setJobInfos(latestJobInfos);
            }else{
                setErrorMessage(getErrorMessage('List job', response.message));
                setJobInfos([]);
                setSelectedJobInfo();
            }
            setIsJobsListLoading(false);
        })
        .catch(err => {
            setErrorMessage(getErrorMessage('List job', err));
            setIsJobsListLoading(false);
        })
    }

    return (
        <StockImageContext.Provider
            value={{
                token, setToken,
                inputFile, setInputFile,
                sendBatchJob,
                jobListPage, setJobListPage,
                isJobsListLoading, setIsJobsListLoading,
                jobInfos, setJobInfos,
                isJobInfoLoading, setIsJobInfoLoading,
                selectedJobInfo, setSelectedJobInfo,
                listJobs,
                checkJobStatus,
                errorMessage, setErrorMessage,
            }}
        >
            {props.children}
        </StockImageContext.Provider>
    );
}