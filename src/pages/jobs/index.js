import React from 'react';
import styles from "@/styles/Jobs.module.scss";
import JobsHeaderBar from "@/components/jobs/JobsHeaderBar.js";
import JobsList from "@/components/jobs/JobsList.js";
import useFetchJobs from "@/hooks/useFetchJobs.js";
import Pagination from "@/components/general/Pagination.js";
import Filters from "@/components/jobs/Filters.js";
import Modal from "@/components/general/Modal.js";
import JobForm from "@/components/jobs/JobForm.js";
import { PAGE_SIZE } from '@/constants';
import { useRouter } from 'next/router';

export default function Jobs() {
    const {query, push} = useRouter();
    const [jobsModalShown, setJobsModalShown] = React.useState(false);
    const [filtersModalShown, setFiltersModalShown] = React.useState(false);
    const { busy, jobsData, addNewJob} = useFetchJobs();
    const filters = React.useRef({
        page: 1,
        name: null,
        sectors: [],
        countries: [],
        cities: []
    });

    const handleAddNewJob = (job) => {
        addNewJob(job);
        setJobsModalShown(false);
    };

    const handlePageChange = (page) => {
        filters.current.page = page;
        applyFilters();
    };

    const handleNameFilterChange = (name) => {
        filters.current.name = name;
        applyFilters();
    };

    const handleFiltersChange = (filtersState) => {
        filters.current.sectors = filtersState.sectors;
        filters.current.countries = filtersState.countries;
        filters.current.cities = filtersState.cities;
        applyFilters();
    };

    const applyFilters = () => {
        // console.log(filters.current);
        push({
            query: filters.current
        });
    };

    React.useEffect(() => {
        // console.log(query);
    }, [query]);

    return (
        <>
            <div className={styles.container}>
                <aside>
                    <Filters handleFiltersChange={handleFiltersChange} />
                </aside>
                <main>
                    <JobsHeaderBar handleNameFilterChange={handleNameFilterChange} onAddJobClicked={() => setJobsModalShown(true)} onFiltersClicked={() => setFiltersModalShown(true)} />
                    {jobsData.jobs.length && !busy > 0 && <JobsList jobs={jobsData.jobs} />}
                    {busy && <div>loading ...</div>}
                    <Pagination currentPage={jobsData.page} totalPages={2} handlePageChange={handlePageChange} />
                </main>
            </div>
            <Modal title="Add New Job Post" isShown={jobsModalShown} onClose={() => setJobsModalShown(false)}>
                <JobForm handleClose={() => setJobsModalShown(false)} handleAddNewJob={handleAddNewJob} />
            </Modal>
            <Modal title="Filters" isShown={filtersModalShown} onClose={() => setFiltersModalShown(false)}>
                <Filters handleFiltersChange={handleFiltersChange} />
            </Modal>
        </>
    );
};
