import $api from "./http/index";

export const signup = (first_name:string, last_name:string, email:string, password:string) => {
    return $api.post("/register", { surname: first_name, name: last_name, email, password });
}

export const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
}

export const getListOfUsers = (page: number) => {
    return $api.get(`/users?page=${page}`)
}

export const changeUserInfo = (id:number) => {
    return $api.patch(`users/${id}`)
}