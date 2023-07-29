import styles from '@/styles/JobCard.module.scss';
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";

const JobCard = ({ job, onJobSelected, onJobRemoved }) => {
    const handleJobRemoved =() => {
      if (confirm(`Are you sure that you want to remove this job: ${job.title} ?`)) {
        onJobRemoved(job);
      }
    };
    return (
      <div className={styles.container}>
        <img src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg" />
        <div className={styles.content}>
            <div className={styles.title}>
                <h3>{job.title}</h3>
                <div className={styles.iconsContainer}>
                  <FaRegEye color="blue" size={24} onClick={() => onJobSelected(job)} />
                  <FaRegTrashAlt color="red" size={20} onClick={handleJobRemoved} />
                </div>
            </div>
            <p>{job.city.name}, {job.country.name}</p>
            <p>{job.sector.name}</p>
            <p className={styles.description}>{job.description}</p>
        </div>
      </div>
    );
};

export default JobCard;