import React, { FC } from 'react';
import styles from './Login.module.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useAppSelector } from '../../redux/hooks';

const Login: FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  return (
    <div className={styles.App}>
      <h1>{isAuth ? `Пользователь авторизован` :  `Пользователь не авторизован`}</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
