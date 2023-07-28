import JobCard from "./JobCard";

const JobsList = ({jobs}) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;