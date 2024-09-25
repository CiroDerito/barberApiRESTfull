import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import { useEffect, useState } from 'react';

const ErrorPage = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (redirect) {
            navigate('/home');
        }
    }, [redirect, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer);
                    setRedirect(true);
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.title}>404</h1>
            <h3 className={styles.description}>
                Sorry, the route does not exist. You will be redirected to the home page in {countdown} seconds.
            </h3>
        </div>
    );
};

export default ErrorPage;
