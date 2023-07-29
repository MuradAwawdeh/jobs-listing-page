import JobCard from "./JobCard";

const JobsList = ({jobs, onJobSelected, onJobRemoved}) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onJobSelected={onJobSelected} onJobRemoved={onJobRemoved} />
      ))}
    </div>
  );
};

export default JobsList;