import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import emailjs from 'emailjs-com';
import { EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../../helpers/emailjs-config';
import styles from './Contact.module.css';
import validateForm from '../../helpers/validateForm'
import { toast } from 'sonner';


const Contact = () => {
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                values,
                EMAILJS_USER_ID
            );
            console.log('Response:', response);
            toast.success('Mail sent successfully');
            resetForm();


        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('There was a problem sending the email');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Formik
                    initialValues={{ name: '', email: '', message: '' }}
                    validate={validateForm}
                    onSubmit={handleSubmit}
                >
                    <Form className={styles.contactForm}>
                        <h2>Contacto</h2>
                        <label htmlFor="name">Nombre</label>
                        <Field type="text" id="name" name="name" className={styles.input} />


                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" className={styles.input} />


                        <label htmlFor="message">Mensaje</label>
                        <Field as="textarea" id="message" name="message" className={styles.textarea} />


                        <button type="submit" className={styles.submitButton}>Enviar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Contact;
