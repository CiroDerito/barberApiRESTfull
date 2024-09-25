import { useSelector } from 'react-redux';
import NavbarIcon from './NavbarIcon';
import NavbarLinks from './NavbarLinks';
import styles from './Navbar.module.css';

const Navbar = () => {
  const userSesion = useSelector(state => state.sesion.userSesion);
  const isLoggedIn = !!userSesion;

  return (
    <nav className={styles.navbar}>
      <NavbarIcon />
      <NavbarLinks isLoggedIn={isLoggedIn} />
    </nav>
  );
};

export default Navbar;
