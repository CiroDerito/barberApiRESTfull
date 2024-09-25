import { useSelector } from 'react-redux';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const userSesion = useSelector(state => state.sesion.userSesion);
    const isLoggedIn = Boolean(userSesion);

    return (
        <div className={styles.homepageContainer}>
            <div className={styles.heroSection}>
                <div className={styles.leftSide}>
                    <h1>GESTIONA TUS TURNOS DE MANERA SIMPLE Y EFICIENTE</h1>
                    <div className="buttons">
                        {!isLoggedIn && (
                            <>
                                <Link to="/login" className={styles.button}>Login</Link>
                                <Link to="/register" className={styles.button}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <h2 className={styles.barbersText}>Barbers</h2>
                    <p>
                        "Nuestro proyecto de gestión de turnos es una solución moderna y eficiente diseñada para simplificar la programación y administración de turnos. Desarrollado con tecnologías avanzadas como TypeScript, PostgreSQL, TypeORM, React y Vite, ofrece una interfaz intuitiva y un backend robusto para asegurar la mejor experiencia al usuario. Desde la asignación de turnos hasta las notificaciones y reportes, nuestra plataforma se adapta a las necesidades de cualquier organización, mejorando la productividad y reduciendo el tiempo dedicado a la administración de horarios."
                    </p>
                </div>
            </div>
            <div className={styles.imagesSection}>
                <img src="https://i0.wp.com/hairinmotion.co.uk/wp-content/uploads/2022/12/tecnicas-basicas-de-barberia-scaled.jpg" alt="Hairstyle" className={styles.imageSmall} />
                <img src="https://img.freepik.com/fotos-premium/barbero-cortando-barba-primer-plano-barber-shop-generative-by-ai_894067-13746.jpg" alt="Barber cutting hair" className={styles.imageLarge} />
                <img src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2023/01/19/16741421335225.jpg" alt="Hair treatment" className={styles.imageSmall} />
            </div>
        </div>
    );
};

export default Home;