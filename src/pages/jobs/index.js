import React from 'react';
import styles from "@/styles/Jobs.module.scss";
import JobsHeaderBar from "@/components/jobs/JobsHeaderBar.js";
import JobsList from "@/components/jobs/JobsList.js";
import useFetchJobs from "@/hooks/useFetchJobs.js";
import Pagination from "@/components/general/Pagination.js";
import Filters from "@/components/jobs/Filters.js";
import { PAGE_SIZE } from '@/constants';
import { useRouter } from 'next/router';

export default function Jobs() {
    const {query, push} = useRouter();
    const { busy, jobsData, addNewJob} = useFetchJobs();
    const filters = React.useRef({
        page: 1,
        name: null,
        sectors: [],
        countries: [],
        cities: []
    });

    const handlePageChange = (page) => {
        filters.current.page = page;
        applyFilters();
    };

    const handleNameFilterChange = (name) => {
        filters.current.name = name;
        applyFilters();
    };

    const handleFiltersChange = () => {};

    const applyFilters = () => {
        push({
            query: filters.current
        });
    };

    React.useEffect(() => {
        // console.log(query);
    }, [query]);

    return (
        <div className={styles.container}>
            <aside>
                <Filters handleFiltersChange={handleFiltersChange} />
            </aside>
            <main>
                <JobsHeaderBar handleNameFilterChange={handleNameFilterChange} />
                {jobsData.jobs.length && !busy > 0 && <JobsList jobs={jobsData.jobs} />}
                {busy && <div>loading ...</div>}
                <Pagination currentPage={jobsData.page} totalPages={2} handlePageChange={handlePageChange} />
            </main>
        </div>
    );
};
