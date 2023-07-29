import React from 'react';
import jobs from "@/data/jobs.json";
import { PAGE_SIZE } from '@/constants';

let importedJobs = jobs;

const useFetchJobs = (filters) => {
    const [busy, setBusy] = React.useState(false);
    const [jobsData, setJobsData] = React.useState({jobs: []});
    const [filteredJobs, setFilteredJobs] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const getJobs = async (filters) => {
        setBusy(true);
        await new Promise((resolve) => setTimeout(resolve, 300)); // api simulation
        let filtered = [...importedJobs];
        if (filters.name) {
            filtered = filtered.filter((job) => job.title.toLowerCase().includes(filters.name.toLowerCase()));
        }
        if (filters.sectors && filters.sectors.length > 0) {
            filtered = filtered.filter((job) => filters.sectors.includes(job.sector.id));
        }
        if (filters.countries && filters.countries.length > 0) {
            filtered = filtered.filter((job) => filters.countries.includes(job.country.id));
        }
        if (filters.cities && filters.cities.length > 0) {
            filtered = filtered.filter((job) => filters.cities.includes(job.city.id));
        }
        setPage(1);
        setFilteredJobs(filtered);
        setJobsData({
            jobs: filtered.slice(0, PAGE_SIZE),
            total: filtered.length,
            page: page
        });
        setBusy(false);
    };

    const addNewJob = (job, filters) => {
        importedJobs = [{
            id: importedJobs.length + 1,
            ...job
        },...importedJobs];
        getJobs(filters);
    };

    const removeJob = (job, filters) => {
        importedJobs = importedJobs.filter((item) => item.id != job.id);
        getJobs(filters);
    };

    const applyFilters = (filters) => {
        console.log(filters);
        getJobs(filters);
    };

    React.useEffect(() => {
        setJobsData({
            jobs: filteredJobs.slice((page - 1) * PAGE_SIZE , page * PAGE_SIZE),
            total: filteredJobs.length,
            page: page
        });
    }, [page, filteredJobs]);

    return {busy, jobsData, addNewJob, removeJob, applyFilters, page, setPage};
};

export default useFetchJobs;