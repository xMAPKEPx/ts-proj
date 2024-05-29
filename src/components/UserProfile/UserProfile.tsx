import React, {FC, useEffect, useState} from 'react';
import styles from "./UserProfile.module.css";
import {changeUserInfo, logout} from "../../api.auth";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {User} from "../../models/User";

const UserProfile : FC = () => {
    const user = useSelector((state : RootState) => state.user.user);
    const [selectedUser, setSelectedUser] = useState<User>(user)
    const [isChanging, setIsChanging] = useState<boolean>(false);

    const handleClick = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault()
        setIsChanging(!isChanging)
    }

    const handleChange = (evt: { target: { name: any; value: any; }; }) => {
        const {name, value} = evt.target
        setSelectedUser(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmit = async (evt: { preventDefault: () => void; }) => {
        evt.preventDefault()
        await changeUserInfo(selectedUser.id)
    }

    return (
        <div>
            <section className={styles.profileSection}>
                <div className={styles.flexRow}>
                    <a href='/' className={styles.highlightProfile}>Назад</a>
                    <button onClick={logout} className={styles.logoutButton}>Выйти</button>
                </div>
            </section>
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
                                    value={selectedUser.last_name}/>
                            </div>

                            <div className={styles.profileFlexCol3}>
                                <label htmlFor='first_name' className={styles.inputLabel}>Имя</label>
                                <input
                                    name="first_name"
                                    id="first_name"
                                    className={styles.input}
                                    disabled={!isChanging}
                                    onChange={handleChange}
                                    value={selectedUser.first_name}/>
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
                                    value={selectedUser.email}/>
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
                                        value={selectedUser.avatar}/>
                                </div>
                            </div>

                        </div>
                        <div className={styles.profileFlexCol5}>
                            <img
                                className={styles.profileImage}
                                src={selectedUser.avatar}
                                alt="alt text"
                            />
                        </div>
                    </div>
                    {isChanging ?
                        <button type='submit' onClick={handleClick} className={styles.profileEditButton}>Сохранить</button> :
                        <button onClick={handleClick} className={styles.profileEditButton}>Редактировать</button>}
                </div>
            </form>
        </div>
    );
};

export default UserProfile;