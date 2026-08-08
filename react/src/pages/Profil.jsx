import { useEffect, useState } from "react";
import { getProfil } from "../services/profilApi";
import "../assets/css/style_profil.css";

function Profil() {

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProfile() {

            const data = await getProfil();

            if (data.success) {
                setProfile(data);
            } else {
                setError(data.message);
            }

        }

        loadProfile();

    }, []);


    if (error) {
        return (
            <div className="profile-container">
                <p>{error}</p>
            </div>
        );
    }


    if (!profile) {
        return (
            <div className="profile-container">
                <p>Chargement...</p>
            </div>
        );
    }


    const { user, stats, badges } = profile;


    return (
        <main className="profile-container">

            {/* HEADER PROFIL */}
            <div className="profile-header">

                <div className="avatar">
                    <img
                        src={`/assets/images/${user.avatar}`}
                        alt="avatar"
                    />
                </div>

                <div className="info">
                    <h1>{user.pseudo}</h1>
                    <p>
                        Inscrit le : {user.date_inscription}
                    </p>
                </div>

            </div>


            {/* STATS */}
            <div className="stats">

                <div className="card">
                    <h3>🎮 Parties jouées</h3>
                    <p>
                        {stats.nb_parties ?? 0}
                    </p>
                </div>


                <div className="card">
                    <h3>🏆 Meilleur score</h3>
                    <p>
                        {stats.best_score ?? 0}
                    </p>
                </div>


                <div className="card">
                    <h3>📊 Moyenne</h3>
                    <p>
                        {Number(stats.avg_score ?? 0).toFixed(1)}
                    </p>
                </div>

            </div>


            {/* BADGES */}
            <h2>🏅 Mes badges</h2>

            <div className="badges">

                {
                    badges.length === 0 ? (

                        <p>Aucun badge obtenu pour le moment.</p>

                    ) : (

                        badges.map((badge) => (

                            <div
                                key={badge.id}
                                className={`badge-card ${badge.rarete}`}
                            >
                                <img
                                    src={`/src/assets/images/badges/${badge.rarete}_medal.png`}
                                    alt={badge.rarete}
                                />

                                <h3>{badge.nom}</h3>

                                <p>
                                    {badge.description}
                                </p>

                                <span>
                                    {badge.rarete}
                                </span>

                            </div>

                        ))

                    )
                }

            </div>

        </main>
    );
}


export default Profil;