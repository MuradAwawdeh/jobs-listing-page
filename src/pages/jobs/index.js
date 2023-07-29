import React from 'react';
import styles from "@/styles/Jobs.module.scss";
import JobsHeaderBar from "@/components/jobs/JobsHeaderBar.js";
import JobsList from "@/components/jobs/JobsList.js";
import useFetchJobs from "@/hooks/useFetchJobs.js";
import Pagination from "@/components/general/Pagination.js";
import Filters from "@/components/jobs/Filters.js";
import Modal from "@/components/general/Modal.js";
import JobForm from "@/components/jobs/JobForm.js";
import LoadingSpinner from "@/components/general/LoadingSpinner.js";
import { PAGE_SIZE } from '@/constants';

export default function Jobs() {
    const filters = React.useRef({
        // page: 1,
        name: "",
        sectors: [],
        countries: [],
        cities: []
    });
    const [jobsModalShown, setJobsModalShown] = React.useState(false);
    const [filtersModalShown, setFiltersModalShown] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState(null);
    const { busy, jobsData, addNewJob, removeJob, applyFilters, page, setPage} = useFetchJobs();

    const handleJobSelected = (job) => {
        setSelectedJob(job);
        setJobsModalShown(true);
    };

    const handleJobRemoved = (job) => {
        removeJob(job, filters.current);
    };

    const handleAddNewJob = (job) => {
        addNewJob(job, filters.current);
        setJobsModalShown(false);
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleNameFilterChange = (name) => {
        filters.current.name = name;
        applyFilters(filters.current);
    };

    const handleFiltersChange = (filtersState) => {
        filters.current.sectors = filtersState.sectors;
        filters.current.countries = filtersState.countries;
        filters.current.cities = filtersState.cities;
        applyFilters(filters.current);
    };

    React.useEffect(() => {
        applyFilters(filters.current);
    }, []);

    return (
        <>
            <div className={styles.container}>
                <aside>
                    <Filters handleFiltersChange={handleFiltersChange} />
                </aside>
                <main>
                    <JobsHeaderBar handleNameFilterChange={handleNameFilterChange} onAddJobClicked={() => {setSelectedJob(null);setJobsModalShown(true)}} onFiltersClicked={() => setFiltersModalShown(true)} />
                    {jobsData.jobs.length > 0 && !busy > 0 && <JobsList jobs={jobsData.jobs} onJobSelected={handleJobSelected} onJobRemoved={handleJobRemoved} />}
                    {jobsData.jobs.length == 0 && !busy > 0 && (
                        <div className={styles.noJobs}>No Jobs Found!</div>
                    )}
                    {busy && <LoadingSpinner />}
                    {Math.ceil(jobsData.total / PAGE_SIZE ) > 1 && !busy && <Pagination currentPage={page} totalPages={Math.ceil(jobsData.total / PAGE_SIZE )} handlePageChange={handlePageChange} />}
                </main>
            </div>
            <Modal title={selectedJob ? selectedJob.title : "Add New Job Post"} isShown={jobsModalShown} onClose={() => setJobsModalShown(false)}>
                <JobForm handleClose={() => setJobsModalShown(false)} handleAddNewJob={handleAddNewJob} jobData={selectedJob} />
            </Modal>
            <Modal title="Filters" isShown={filtersModalShown} onClose={() => setFiltersModalShown(false)}>
                <Filters handleFiltersChange={handleFiltersChange} />
            </Modal>
        </>
    );
};
