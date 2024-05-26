import React, { FC, useState } from 'react'
import { login, logout } from '../../api.auth'
import { useAppDispatch } from '../../redux/hooks'
import { setAuth } from '../../redux/AuthSlice/AuthSlice'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('eve.holt@reqres.in')
    const [password, setPassword] = useState<string>('cityslicka')
    const [isError, setIsError] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleSubmit = async() => {
        try {
            const response = await login(email, password)
            setIsLogin(true)
            setIsError(false)
            localStorage.setItem('token', response.data.token)
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

    return (
        <div>
            <input 
                onChange={e => setEmail(e.target.value)}
                type="text" 
                name="email" 
                placeholder='Email' 
                value={email}
            />
            <input 
                onChange={e => setPassword(e.target.value)}
                type="password" 
                name="password" 
                placeholder='Password' 
                value={password}
            />

            <button onClick={handleSubmit}>Login</button>
            <button onClick={logout}>Logout</button>
            {isLogin && <span>Вы успешно вошли в аккаунт</span>}
            {isError && <span>Произошла ошибка</span>}
        </div>
    )
}

export default LoginForm
