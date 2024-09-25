import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import validateRegister from '../../helpers/validateRegister';
import axios from 'axios';
import { toast } from 'sonner';

function Register() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        birthdate: '',
        nDni: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedUserData = {
            ...userData,
            [name]: value
        };
        setUserData(updatedUserData);
        validateFields(updatedUserData);
    }

    const validateFields = (updatedUserData) => {
        const validationErrors = validateRegister(updatedUserData);
        setErrors(validationErrors);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateRegister(userData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await axios.post("http://localhost:3000/users/register", userData);
                setSuccessMessage;
                toast.success('User registered successfully')
                handleReset();
                setTimeout(() => {
                    navigate('/home');
                }, 500);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message === 'User already exists') {
                    toast.error(`User already exists. Registered data:\n${JSON.stringify(error.response.data.existingUser, null, 2)}`);
                } else {
                    console.error('Error sending form:', error);
                    toast.error('An error occurred while registering the user. Please try again.');
                }
            }
        } else {
            const errorMessages = Object.values(validationErrors).join('\n');
            toast.error(`Validation errors:\n${errorMessages}`);
        }
    }

    const handleReset = () => {
        setUserData({
            name: '',
            email: '',
            birthdate: '',
            nDni: '',
            username: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
        setSuccessMessage('');
    }

    return (
        <form onSubmit={handleOnSubmit} className={styles.form}>
            <h2>Create Account</h2>

            <label>Name:</label>
            <input
                type='text'
                value={userData.name}
                placeholder='Enter your name'
                name='name'
                onChange={handleInputChange}
                className={styles.formInput}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}

            <label>Email:</label>
            <input
                type='text'
                value={userData.email}
                name='email'
                placeholder='example@mail.com'
                onChange={handleInputChange}
                className={styles.formInput}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}

            <label>Birthdate:</label>
            <input
                type='date'
                value={userData.birthdate}
                name='birthdate'
                onChange={handleInputChange}
                className={styles.formInput}
            />
            {errors.birthdate && <span className={styles.error}>{errors.birthdate}</span>}

            <label>DNI:</label>
            <input
                type='number'
                value={userData.nDni}
                name='nDni'
                placeholder='Enter your ID without dots'
                onChange={handleInputChange}
                className={styles.formInput}
            />
            {errors.nDni && <span className={styles.error}>{errors.nDni}</span>}

            <label>Username:</label>
            <input
                type='text'
                value={userData.username}
                name="username"
                placeholder='Enter your username'
                onChange={handleInputChange}
                className={styles.formInput}
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}

            <label>Password:</label>
            <input
                type='password'
                value={userData.password}
                name="password"
                placeholder='**********'
                onChange={handleInputChange}
                className={styles.formInput}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}

            <label>Confirm Password:</label>
            <input
                type='password'
                value={userData.confirmPassword}
                name="confirmPassword"
                placeholder='**********'
                onChange={handleInputChange}
                className={styles.formInput}
            />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}

            <div className={styles.buttonContainer}>
                <button type="submit"
                    disabled={(!userData.birthdate && !userData.confirmPassword && !userData.password && !userData.email && !userData.nDni && !userData.name && !userData.username)}>Enviar</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </div>

            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        </form>
    );
}

export default Register;
