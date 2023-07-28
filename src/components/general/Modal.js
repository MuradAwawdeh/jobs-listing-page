import styles from "@/styles/Modal.module.scss";
import { FaRegWindowClose } from "react-icons/fa";

const Modal = ({ children, title, isShown, onClose }) => {
    if (!isShown) return null;
    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    {title}
                    <FaRegWindowClose className={styles.close} onClick={() => onClose()}/>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;