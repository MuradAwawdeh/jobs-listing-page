import styles from "@/styles/LoadingSpinner.module.scss";

const LoadingSpinner = () => (
    <div className={styles.container}>
        <div className={styles.spinner} />
        <span>Loading ...</span>
    </div>
);

export default LoadingSpinner;