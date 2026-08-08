import { API_URL } from "../config/api";

export async function getProfil() {

    const response = await fetch(
        `${API_URL}/profil.php`,
        {
            credentials: "include"
        }
    );

    return response.json();

}