import React, { FC } from 'react';
import styles from './NavBar.module.css';
import { logout } from '../../api.auth';
import search from '../../assets/search.png'

const NavBar : FC = (props) => {
  return (
    <section className={styles.profileSection}>
      <div className={styles.flexRow}>
        <div className={styles.contentBox}>
          <div className={styles.flexRow1}>
            <img
              className={styles.profileImage}
              src={search}
              alt="alt text"
            />
            <h4 className={styles.highlightSearch}>Поиск</h4>
          </div>
        </div>

        <a href='/' className={styles.highlightProfile}>Профиль</a>
        <button onClick={logout} className={styles.logoutButton}>Выйти</button>
      </div>
    </section>
  );
}

export default NavBar;
