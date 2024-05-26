import React, { FC } from 'react';
import styles from './Main.module.css';
import { observer } from 'mobx-react-lite';
import { useAppSelector } from '../../redux/hooks';

const Main: FC = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)

  return (
    <div className={styles.App}>
      <h1>{isAuth ? `Пользователь авторизован` :  `Пользователь не авторизован`}</h1>
    </div>
  );
}

export default observer(Main);
