import styles from "@/styles/Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    if (!totalPages) return null;

    return (
        <div className={styles.container}>
            {Array.from(Array(totalPages), (e, i) => (
                <div onClick={() => handlePageChange(i + 1)} className={currentPage == (i + 1) ? styles.selected : null} key={i}>{i + 1}</div>
            ))}
        </div>
    );
};

export default Pagination;