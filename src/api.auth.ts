import $api from "./http/index";

export const signup = (first_name:string, last_name:string, email:string, password:string) => {
    return $api.post("/register", { surname: first_name, name: last_name, email, password });
}

export const login = (email:string, password:string) => {
    return $api.post("/login", {email, password})
}

export const logout = () => {
    localStorage.removeItem('token')
}