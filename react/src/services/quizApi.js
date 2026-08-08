import { API_URL } from "../config/api";

export async function getQuestions(gameId = 1, limit = 10) {

    const response = await fetch(
        `${API_URL}/questions.php?game_id=${gameId}&limit=${limit}`,
        {
            credentials: "include"
        }
    );

    return response.json();
}


export async function saveScore(score, total, gameId) {

    const response = await fetch(
        `${API_URL}/save_score.php`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                score,
                total,
                game_id: gameId
            })
        }
    );

    return response.json();

}