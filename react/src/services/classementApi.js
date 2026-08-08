import { API_URL } from "../config/api";

export async function getClassement(gameId = 0) {

    const response = await fetch(
        `${API_URL}/classement.php?game_id=${gameId}`,
        {
            credentials: "include"
        }
    );

    return response.json();

}