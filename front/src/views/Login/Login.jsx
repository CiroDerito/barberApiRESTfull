import { useState } from "react";
import styles from './Login.module.css';
import validateLogin from "../../helpers/validateLogin";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { userLogIn } from '../../redux/reducer';
import { useNavigate } from "react-router-dom"; useNavigate
import { toast } from 'sonner'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleReset = () => {
        setLoginData({
            username: '',
            password: '',
        });
        setErrors({});
        setSuccessMessage('');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(validateLogin({
            ...loginData,
            [name]: value
        }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateLogin(loginData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:3000/users/login", loginData);

                if (response.data.message === 'Login exitoso') {
                    const { ...otherData } = response.data;
                    dispatch(userLogIn({ ...otherData }));
                    // console.log(otherData);   LOG QUE SIRVE PARA DEPURAR SI SE ESTA GUARDANDO EN EL GLOBAL
                    toast.success('Login successful');
                    handleReset();
                    setTimeout(() => {
                        navigate('/home');
                    }, 500);
                } else {
                    toast.error(response.data.message || 'An error occurred while trying to log in. Please try again.');
                }

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error('Unregistered user, please register.');
                } else {
                    console.error('Error trying to log in:', error);
                    toast.error('An error occurred while trying to log in. Please try again.');
                }
            }
        } else {
            console.log("Validation errors, form cannot be submitted");
        }
    };

    return (
        <form onSubmit={handleOnSubmit} className={styles.form}>
            <h2>Welcome</h2>
            <label>Username: </label>
            <input
                type="text"
                value={loginData.username}
                name="username"
                placeholder='Enter your username'
                className={styles.formInput}
                onChange={handleInputChange}
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}

            <label>Password:</label>
            <input
                type="password"
                value={loginData.password}
                name="password"
                placeholder="*****"
                className={styles.formInput}
                onChange={handleInputChange}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}

            <button type="submit" className={styles.button} disabled={!loginData.username || !loginData.password}>
                Login
            </button>
        </form>
    );
}

export default Login;
