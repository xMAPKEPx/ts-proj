import React, { FC, useState } from 'react'
import { signup, logout } from '../../api.auth'
import { useAppDispatch } from '../../redux/hooks'
import { setAuth } from '../../redux/AuthSlice/AuthSlice'
import { IUser } from '../../models/IUser'
import styles from './RegisterForm.module.css'

const RegisterForm: FC = () => {
    const [user, setUser] = useState<IUser>({
        id: NaN,
        email: 'eve.holt@reqres.in',
        first_name: 'Eve',
        last_name: 'Holt',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        password: 'cityslicka'
    })
    const [isError, setIsError] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleSubmit = async() => {
        try {
            const response = await signup(user.first_name, user.last_name, user.email, user.password)
            setIsLogin(true)
            setIsError(false)
            setUser(prevFormData => ({
                ...prevFormData,
                id: response.data.id,
            }))
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(user))

            dispatch(setAuth(localStorage.getItem('token')!==null))

            window.location.href = '/'
        } catch (e) {
            setIsError(true)
            setIsLogin(false)
            console.log('Error: ' + e)
        } finally {
            setIsLogin(false)
        }
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const {name, value} = evt.target
        setUser(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    return (
        <div className={styles.registrationSection}>
            <div className={styles.box}>
                <div className={styles.flex_col}>
                    <h1 className={styles.title_box_box}>
            <span className={styles.title_box}>
              <span className={styles.title_box_span0}>Регистрация</span>
              <span className={styles.title_box_span1}/>
            </span>
                    </h1>

                    <div className={styles.flex_col1}>
                        <label className={styles.lastNameLabel} htmlFor={'first_name'}>Имя</label>
                        <input
                            className={styles.inputField}
                            onChange={e => handleChange(e)}
                            type="text"
                            name="first_name"
                            placeholder='Name'
                            value={user.first_name}
                        />
                        <label className={styles.firstNameLabel} htmlFor='last_name'>Фамилия</label>
                        <input
                            className={styles.inputField}
                            onChange={e => handleChange(e)}
                            type="text"
                            name="last_name"
                            placeholder='Surname'
                            value={user.last_name}
                        />
                        <label className={styles.emailLabel} htmlFor='email'>E-mail</label>
                        <input
                            className={styles.inputField}
                            onChange={e => handleChange(e)}
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={user.email}
                        />
                        <label className={styles.passwordLabel} htmlFor='password'>Пароль</label>
                        <input
                            className={styles.inputField}
                            onChange={e => handleChange(e)}
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={user.password}
                        />
                        <label className={styles.photoLinkLabel} htmlFor='avatar'>Ссылка на аватар</label>
                        <input
                            className={styles.inputField}
                            onChange={e => handleChange(e)}
                            type="url"
                            name="avatar"
                            placeholder='Link for avatar'
                            value={user.avatar}
                        />
                    </div>

                    <button className={styles.registerButton} onClick={handleSubmit}>Зарегистрироваться</button>
                    {isLogin && <span>Вы успешно вошли в аккаунт</span>}
                    {isError && <span>Произошла ошибка</span>}
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
