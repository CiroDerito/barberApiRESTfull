import { useNavigate } from 'react-router-dom';
import styles from './NoAppointments.module.css';
import { useEffect } from 'react';

const NoAppointments = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/turns');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.container}>
            <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/689175a7-4dc6-409e-9fc1-855ecdd8f1d7/d5b36tv-f4b9dba1-47b4-4b82-8320-f3d5cddf5599.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY4OTE3NWE3LTRkYzYtNDA5ZS05ZmMxLTg1NWVjZGQ4ZjFkN1wvZDViMzZ0di1mNGI5ZGJhMS00N2I0LTRiODItODMyMC1mM2Q1Y2RkZjU1OTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.55gUK6Z5EnRQ0LTdDNp4Hdizo2tddOKbs3XQemeRR4g"
                alt="no-appointments"
                className={styles.image}
            />
            <h3 className={styles.text}>You have no appointments currently...</h3>
            <p className={styles.text}>Don't worry, you will be redirected to create one.😉</p>
        </div>
    );
};

export default NoAppointments;
