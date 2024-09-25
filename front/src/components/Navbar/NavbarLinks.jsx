import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const NavbarLinks = ({ isLoggedIn }) => {
  return (
    <div className={styles.navbar__links}>
      <NavLink to="/home" className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/turns" className={({ isActive }) => (isActive ? styles.active : '')}>Get Turn</NavLink>
          <NavLink to="/myTurns" className={({ isActive }) => (isActive ? styles.active : '')}>My current turns</NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : '')}>Profile</NavLink>
        </>
      )}
      <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>About</NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : '')}>Contact</NavLink>
    </div>
  );
};

export default NavbarLinks;
