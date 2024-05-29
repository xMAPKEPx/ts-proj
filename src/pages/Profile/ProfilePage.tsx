import React, {useEffect, useState} from 'react';
import NavBar from "../../components/NavBarWOSearch/NavBar";
import UserProfile from "../../components/UserProfile/UserProfile";
import {IUser} from "../../models/IUser";
import styles from "../../components/UserProfile/UserProfile.module.css";
import {logout} from "../../api.auth";

const ProfilePage = () => {
    const [user, setUser] = useState<IUser>({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        avatar: ''
    })
    const [isChanging, setIsChanging] = useState<boolean>(false);
    useEffect(()=>{
        // @ts-ignore
        setUser(JSON.parse(localStorage.getItem("user")));
        console.log(user)
    }, [])

    const handleClick = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault()
        setIsChanging(!isChanging)
    }

    const handleChange = (evt: { target: { name: any; value: any; }; }) => {
        const {name, value} = evt.target
        setUser(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmit = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault()
        setIsChanging(false)
        localStorage.setItem('user', JSON.stringify(user));
    }
    return (
        <div>
            <NavBar />
            <form className={styles.profileContentBox} onSubmit={handleSubmit}>
                <div className={styles.profileFlexCol1}>
                    <div className={styles.profileFlexRow}>
                        <div className={styles.profileFlexCol2}>
                            <div className={styles.profileFlexCol3}>
                                <label htmlFor='last_name' className={styles.inputLabel}>Фамилия</label>
                                <input
                                    name="last_name"
                                    id="last_name"
                                    className={styles.input}
                                    disabled={!isChanging}
                                    onChange={handleChange}
                                    value={user.last_name}/>
                            </div>

                            <div className={styles.profileFlexCol3}>
                                <label htmlFor='first_name' className={styles.inputLabel}>Имя</label>
                                <input
                                    name="first_name"
                                    id="first_name"
                                    className={styles.input}
                                    disabled={!isChanging}
                                    onChange={handleChange}
                                    value={user.first_name}/>
                            </div>

                            <div className={styles.profileFlexCol3}>
                                <label htmlFor='email' className={styles.inputLabel}>E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={styles.input}
                                    disabled={!isChanging}
                                    onChange={handleChange}
                                    value={user.email}/>
                            </div>

                            <div className={styles.profileFlexCol4}>
                                <label htmlFor='password' className={styles.inputLabel}>Пароль</label>

                                <div className={styles.profilePasswordFlexRow}>
                                    <input
                                        type='password'
                                        name="password"
                                        id="password"
                                        className={styles.input}
                                        disabled={!isChanging}
                                        onChange={handleChange}
                                        value={user.password}/>
                                </div>
                            </div>
                            <div className={styles.profileFlexCol4}>
                                <label htmlFor='avatar' className={styles.inputLabel}>Ссылка на аватар</label>

                                <div className={styles.profilePasswordFlexRow}>
                                    <input
                                        type='text'
                                        name="avatar"
                                        id="avatar"
                                        className={styles.input}
                                        disabled={!isChanging}
                                        onChange={handleChange}
                                        value={user.avatar}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileFlexCol5}>
                            <img
                                className={styles.profileImage}
                                src={user.avatar}
                                alt="alt text"
                            />
                        </div>
                    </div>
                    {isChanging ?
                        <button type="submit" onClick={handleClick}
                                className={styles.profileEditButton}>Сохранить</button> :
                        <button onClick={handleClick} className={styles.profileEditButton}>Редактировать</button>}
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;