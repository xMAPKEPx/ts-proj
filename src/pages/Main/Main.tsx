import React, { FC } from 'react';
import styles from './Main.module.css';
import { useAppSelector } from '../../redux/hooks';
import { logout } from '../../api.auth';
import UsersList from '../../components/UsersList/UsersList';
import NavBar from '../../components/navBar/NavBar';

const Main: FC = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)

  return (
    <div className={styles.App}>
      <NavBar />
      <h1>{isAuth ? `Пользователь авторизован` :  `Пользователь не авторизован`}</h1>
      <button onClick={logout}>Logout</button>
      <UsersList />
    </div>
  );
}

export default Main;