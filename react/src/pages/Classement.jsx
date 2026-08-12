import { useEffect, useState } from "react";
import { getClassement } from "../services/classementApi";
import "../assets/css/style_classement.css";


function formatTemps(secondes) {

    if (secondes === null || secondes === undefined) {
        return "-";
    }

    const m = Math.floor(secondes / 60);
    const s = secondes % 60;

    return `${m}:${String(s).padStart(2, "0")}`;

}


function Classement() {

    const [jeux, setJeux] = useState([]);
    const [classement, setClassement] = useState([]);
    const [gameId, setGameId] = useState(0);
    const [type, setType] = useState("quiz");


    useEffect(() => {

        if (gameId !== 0) {
            loadClassement();
        }

    }, [gameId]);


    useEffect(() => {

        loadJeux();

    }, []);


    async function loadJeux() {

        const data = await getClassement(0);

        if (data.success && data.jeux.length > 0) {
            setJeux(data.jeux);
            setGameId(data.jeux[0].id);
        }

    }


    async function loadClassement() {

        const data = await getClassement(gameId);

        if (data.success) {
            setClassement(data.classement);
            setType(data.type ?? "quiz");
        }

    }


    return (

        <main className="leaderboard-container">

            <h1>🏆 Classement Yunarix</h1>


            <div className="filter-box">

                <select
                    value={gameId}
                    onChange={(e) => setGameId(Number(e.target.value))}
                >

                    {jeux.map((jeu) => (

                        <option 
                            key={jeu.id}
                            value={jeu.id}
                        >
                            {jeu.nom}
                        </option>

                    ))}

                </select>

            </div>


            <div className="table-wrapper">

                <table className="leaderboard-table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Joueur</th>
                            <th>Score</th>
                            <th>{type === "puzzle" ? "Meilleur temps" : "Total"}</th>
                        </tr>
                    </thead>


                    <tbody>

                        {classement.length === 0 && (

                            <tr>
                                <td colSpan="4">
                                    Aucun score pour ce jeu
                                </td>
                            </tr>

                        )}


                        {classement.map((row, index) => (

                            <tr key={index}>

                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    {row.pseudo}
                                </td>

                                <td className="score">
                                    {row.best_score}
                                </td>

                                <td>
                                    {type === "puzzle"
                                        ? formatTemps(row.meilleur_temps)
                                        : row.total}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </main>

    );
}


export default Classement;