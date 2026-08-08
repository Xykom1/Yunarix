import { API_URL } from "../config/api";


export async function getAuth() {

    const response = await fetch(
        `${API_URL}/auth.php`,
        {
            credentials: "include"
        }
    );

    return response.json();

}


export async function login(pseudo, password) {

    const response = await fetch(
        `${API_URL}/login.php`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pseudo,
                password
            })
        }
    );

    return response.json();

}


export async function logout() {

    const response = await fetch(
        `${API_URL}/logout.php`,
        {
            method: "POST",
            credentials: "include"
        }
    );

    return response.json();

}


export async function register(user) {

    const response = await fetch(
        `${API_URL}/register.php`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    );

    return response.json();

}