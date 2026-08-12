const API_URL = "http://localhost/Yunarix/api/puzzle.php";
const SCORE_API_URL = "http://localhost/Yunarix/api/save_puzzle_score.php";


export async function getPuzzle() {

    const response = await fetch(API_URL, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération du puzzle");
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || "Impossible de récupérer le puzzle");
    }

    return data.puzzle;
}


export async function savePuzzleScore(
    puzzleId,
    difficulty,
    time,
    moves,
    score
) {

    const response = await fetch(SCORE_API_URL, {

        method: "POST",

        credentials: "include",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            puzzle_id: puzzleId,
            difficulte: difficulty,
            temps: time,
            mouvements: moves,
            score: score
        })

    });


    if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du score");
    }


    const data = await response.json();


    if (!data.success) {
        throw new Error(
            data.message || "Impossible d'enregistrer le score"
        );
    }


    return data;

}

