import React from 'react';
import jobs from "@/data/jobs.json";
import { useRouter } from "next/router";

const useFetchJobs = () => {
    const {query} = useRouter();
    const [busy, setBusy] = React.useState(false);
    const [jobsData, setJobsData] = React.useState({jobs: []});

    const addNewJob = (job) => {
        console.log(job)
        setJobsData((currentJobs) => {
            const jobs = [{
                id: currentJobs.jobs.length + 1,
                ...job
            }, ...currentJobs.jobs];
            return {
                ...currentJobs,
                jobs
            }
        });
    };

    const getJobs = async () => {
        setBusy(true);
        const data = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    jobs: jobs,
                    total: jobsData.jobs.length,
                    page: query.page ? query.page : 1
                });
            }, 300);
        });
        setJobsData(data);
        setBusy(false);
    };

    React.useEffect(() => {
        getJobs();
    }, [query]);

    return {busy, jobsData, addNewJob};
};

export default useFetchJobs;