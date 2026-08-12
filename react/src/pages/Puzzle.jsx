import { useEffect, useState } from "react";
import { getPuzzle, savePuzzleScore } from "../services/puzzleApi";
import PuzzleBoard from "../components/PuzzleBoard";

import "../assets/css/style_puzzle.css";


function Puzzle() {

    const [difficulty, setDifficulty] = useState(null);
    const [puzzle, setPuzzle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [scoreSaved, setScoreSaved] = useState(false);

    useEffect(() => {

        if (!puzzle || completed) {
            return;
        }

        const timer = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [puzzle, completed]);

    const difficulties = {
        facile: 3,
        moyen: 4,
        difficile: 5
    };

    function changeDifficulty() {

        setPuzzle(null);
        setDifficulty(null);
        setCompleted(false);
        setMoves(0);
        setTime(0);
        setScoreSaved(false);
        setError(null);

    }

    function calculateScore() {

        const baseScore = {
            facile: 1000,
            moyen: 2000,
            difficile: 3000
        };

        const scoreBase = baseScore[difficulty];

        const timePenalty = time * 5;

        const movePenalty = moves * 10;

        return Math.max(
            0,
            scoreBase - timePenalty - movePenalty
        );

    }

    async function handleComplete() {

        setCompleted(true);

        const finalScore = calculateScore();

        try {

            await savePuzzleScore(
                puzzle.id,
                difficulty,
                time,
                moves,
                finalScore
            );

            setScoreSaved(true);

        } catch (error) {

            console.error(
                "Erreur lors de la sauvegarde du score :",
                error
            );

        }

    }

    async function startPuzzle(selectedDifficulty) {

        setDifficulty(selectedDifficulty);
        setLoading(true);
        setError(null);

        try {

            const data = await getPuzzle();

            setPuzzle(data);

        } catch (error) {

            console.error(error);
            setError("Impossible de charger le puzzle.");

        } finally {

            setLoading(false);

        }

    }


    function backToDifficulty() {

        setDifficulty(null);
        setPuzzle(null);

    }


    // Écran de choix de difficulté
    if (!difficulty) {

        return (

            <main className="puzzle-page">

                <h1>🧩 Puzzle Anime</h1>

                <p>Choisis ta difficulté</p>

                <div className="difficulty-container">

                    <button
                        className="difficulty-card easy"
                        onClick={() => startPuzzle("facile")}
                    >
                        <h2>🟢 Facile</h2>
                        <p>3 × 3</p>
                        <span>9 pièces</span>
                    </button>


                    <button
                        className="difficulty-card medium"
                        onClick={() => startPuzzle("moyen")}
                    >
                        <h2>🟠 Moyen</h2>
                        <p>4 × 4</p>
                        <span>16 pièces</span>
                    </button>


                    <button
                        className="difficulty-card hard"
                        onClick={() => startPuzzle("difficile")}
                    >
                        <h2>🔴 Difficile</h2>
                        <p>5 × 5</p>
                        <span>25 pièces</span>
                    </button>

                </div>

            </main>

        );

    }


    // Chargement
    if (loading) {

        return (

            <main className="puzzle-page">

                <p>Chargement du puzzle...</p>

            </main>

        );

    }


    // Erreur
    if (error) {

        return (

            <main className="puzzle-page">

                <p>{error}</p>

                <button
                    className="btn-primary"
                    onClick={backToDifficulty}
                >
                    Retour
                </button>

            </main>

        );

    }


    // Puzzle chargé
    return (

        <main className="puzzle-page">

            <h1>🧩 Puzzle Anime</h1>

            <p>
                Difficulté :{" "}
                <strong>
                    {difficulty}
                </strong>
            </p>

            <h2>{puzzle.nom}</h2>

            <p>{puzzle.anime}</p>

            <p className="puzzle-time">
                ⏱️ Temps : {Math.floor(time / 60)}:
                {String(time % 60).padStart(2, "0")}
            </p>

            <p className="puzzle-moves">
                🔄 Mouvements : {moves}
            </p>

            <PuzzleBoard
                image={puzzle.image}
                gridSize={difficulties[difficulty]}
                completed={completed}
                onComplete={handleComplete}
                onMove={() => setMoves(prev => prev + 1)}
            />

            {!completed && (
                <button
                    className="btn-secondary"
                    onClick={changeDifficulty}
                >
                    Quitter
                </button>
            )}

            {completed && (
                <div className="puzzle-result">

                    <h2>🎉 Puzzle terminé !</h2>

                    <p>
                        ⏱️ Temps :{" "}
                        {Math.floor(time / 60)}:
                        {String(time % 60).padStart(2, "0")}
                    </p>

                    <p>
                        🔄 Mouvements : {moves}
                    </p>

                    <p>
                        🏆 Score : {calculateScore()} points
                    </p>

                    <button
                        className="btn-primary"
                        onClick={changeDifficulty}
                    >
                        🔄 Rejouer
                    </button>

                </div>
            )}

        </main>

    );

}


export default Puzzle;