import { useEffect, useState } from "react";
import { getClassement } from "../services/classementApi";
import "../assets/css/style_classement.css";


function Classement() {

    const [jeux, setJeux] = useState([]);
    const [classement, setClassement] = useState([]);
    const [gameId, setGameId] = useState(0);


    useEffect(() => {

        loadClassement();

    }, [gameId]);


    async function loadClassement() {

        const data = await getClassement(gameId);

        if (data.success) {
            setJeux(data.jeux);
            setClassement(data.classement);
        }

    }


    return (

        <main className="leaderboard-container">

            <h1>🏆 Classement Yunarix</h1>


            <div className="filter-box">

                <select
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                >

                    <option value="0">
                        🌐 Tous les jeux
                    </option>

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
                            <th>Total</th>
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
                                    {row.total}
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