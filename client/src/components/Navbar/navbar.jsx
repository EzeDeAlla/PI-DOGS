import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = ({setPage}) => {
    return (
        <nav className={styles.contentNavBar}>
        <div className={styles.title}>
            <Link to='/home' className={styles.title}>
                <h1 className={styles.logoName}>Dogs</h1>
            </Link>
        </div>

        <div className={styles.menu}>
            <div className={styles.list}>
                <Link to={'/home'} className={styles.home}>
                    <span>Home</span>
                </Link>
            </div>
        </div>

        </nav>
    )
}


export default NavBar;