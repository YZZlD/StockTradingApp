import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (

    <nav className={styles.navbar}>
      {/* Left: Brand */}
      <div className={styles.brand}>
        <div className={styles.logo}>📊</div>
        <span className={styles.title}>StockSocial</span>
      </div>

      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Home</NavLink>

        <NavLink to="/chat/general" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Chat</NavLink>

        <NavLink to="/portfolio" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Portfolio</NavLink>

        <NavLink to="/watchlist" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Watchlist</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
