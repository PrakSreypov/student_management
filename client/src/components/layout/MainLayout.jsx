import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const navigate = useNavigate();
  
  const onClickBtn = () => {
    navigate('about')
  }

  return (
    <div>
      <ul className={styles.menu}>
        <li className={styles.item}><Link to={'/'}>Home</Link></li>
        <li className={styles.item}><Link to={'About'}>About</Link></li>
        <li className={styles.item}><Link to={'Student'}>Contact</Link></li>
      </ul>

      <button onClick={onClickBtn}>Link to About</button>

      <div>
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
