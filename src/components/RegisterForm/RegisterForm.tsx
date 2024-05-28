import React, { FC, useState } from 'react'
import { signup, logout } from '../../api.auth'
import { useAppDispatch } from '../../redux/hooks'
import { setAuth } from '../../redux/AuthSlice/AuthSlice'
import { IUser } from '../../models/IUser'

const RegisterForm: FC = () => {
    const [user, setUser] = useState<IUser>({
        id: NaN,
        email: 'eve.holt@reqres.in',
        first_name: 'Eve',
        last_name: 'Holt',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
    })
    const [password, setPassword] = useState<string>('cityslicka')
    const [isError, setIsError] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleSubmit = async() => {
        try {
            const response = await signup(user.first_name, user.last_name, user.email, password)
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
        <div>
            <input 
                onChange={e => handleChange(e)}
                type="text" 
                name="first_name" 
                placeholder='Name' 
                value={user.first_name}
            />
            <input 
                onChange={e => handleChange(e)}
                type="text" 
                name="last_name" 
                placeholder='Surname' 
                value={user.last_name}
            />
            <input 
                onChange={e => handleChange(e)}
                type="email" 
                name="email" 
                placeholder='Email' 
                value={user.email}
            />
            <input 
                onChange={e => setPassword(e.target.value)}
                type="password" 
                name="password" 
                placeholder='Password' 
                value={password}
            />
            <input 
                onChange={e => handleChange(e)}
                type="url" 
                name="avatar" 
                placeholder='Link for avatar' 
                value={user.avatar}
            />

            <button onClick={handleSubmit}>Register</button>
            <button onClick={logout}>Logout</button>
            {isLogin && <span>Вы успешно вошли в аккаунт</span>}
            {isError && <span>Произошла ошибка</span>}
        </div>
    )
}

export default RegisterForm
