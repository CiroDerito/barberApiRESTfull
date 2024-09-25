import styles from './Navbar.module.css';

const NavbarSearch = () => {
  return (
    <div className={styles.navbar__search}>
      <input type="text" placeholder="Buscar..." />
    </div>
  );
};

export default NavbarSearch;
