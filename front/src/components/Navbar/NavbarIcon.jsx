import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const NavbarIcon = () => {
  return (
    <div className={styles.navbar__icon}>
      <Link to="home">
        <img alt="icon" src="https://cdn-icons-png.flaticon.com/512/7338/7338646.png" />
      </Link>
    </div >
  );
};

export default NavbarIcon;
