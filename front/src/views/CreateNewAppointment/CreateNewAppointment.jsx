import { Form, Field, ErrorMessage, Formik } from 'formik';
import validateTurn from '../../helpers/validateTurn';
import styles from './CreateNewAppointment.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

function CreateNewAppointment() {

    const userSesion = useSelector((state) => state.sesion.userSesion);
    const userId = userSesion?.id;

    return (
        <div className={styles.homepageContainer}>
            <div className={styles.imageSection}>
                {/* Sección de imagen */}
            </div>
            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <Formik
                        initialValues={{
                            date: '',
                            time: '',
                            description: '',
                            status: 'active',
                        }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            if (!userId) {
                                toast.error('No user session detected. Please log in.');
                                setSubmitting(false);
                                return;
                            }

                            try {
                                const response = await axios.post('http://localhost:3000/turns/schedule', {
                                    ...values,
                                    userId: userId,
                                });
                                console.log('Datos enviados:', {
                                    ...values,
                                    userId: userId,
                                });
                                if (response.status === 201) {
                                    toast.success(`Appointment scheduled for ${values.description} successfully at ${values.time}`);
                                    resetForm();
                                } else {
                                    toast.error('Error scheduling appointment.');
                                }
                            } catch (error) {
                                console.error('Error:', error);
                                toast.error('An error occurred. Please try again.');
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                        validate={validateTurn}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <h2 className={styles.title}>Agendar turno:</h2>
                                <label className={styles.label} htmlFor="date">Date:</label>
                                <Field
                                    id="date"
                                    name="date"
                                    type="date"
                                    className={styles.input}
                                />
                                <ErrorMessage className={styles.error} name="date" component={"span"} />
                                <label className={styles.label} htmlFor="time">Time:</label>
                                <Field
                                    id="time"
                                    type="time"
                                    name="time"
                                    placeholder="--:-- hs"
                                    className={styles.input}
                                />
                                <ErrorMessage className={styles.error} name="time" component={"span"} />
                                <label className={styles.label} htmlFor="description">Description:</label>
                                <Field
                                    id="description"
                                    name="description"
                                    as="select"
                                    className={styles.select}
                                >
                                    <option value="" disabled>Select one</option>
                                    <option value="Haircut">Haircut</option>
                                    <option value="Dye">Dye</option>
                                    <option value="Hairstyle">Hairstyle</option>
                                    <option value="Brushing">Brushing</option>
                                    <option value="Beard trim">Beard trim</option>
                                    <option value="Keratin">Keratin</option>
                                    <option value="Smoothing">Smoothing</option>
                                </Field>
                                <ErrorMessage className={styles.error} name="description" component={"span"} />
                                <button type="submit" disabled={isSubmitting} className={styles.button}> Schedule </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default CreateNewAppointment;
