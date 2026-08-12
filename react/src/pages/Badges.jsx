import { useEffect, useState } from "react";
import { getProfil } from "../services/profilApi";
import "../assets/css/style_badges.css";

function Badges() {

    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadBadges() {

            const data = await getProfil();

            if (data.success) {
                setBadges(data.badges);
            } else {
                setError(data.message);
            }

            setLoading(false);

        }

        loadBadges();

    }, []);


    if (loading) {
        return (
            <main className="badges-container">
                <p className="badges-status">Chargement...</p>
            </main>
        );
    }


    if (error) {
        return (
            <main className="badges-container">
                <p className="badges-status">{error}</p>
            </main>
        );
    }


    return (
        <main className="badges-container">

            <h1>🏅 Mes badges</h1>

            <p className="badges-subtitle">
                {badges.length} badge{badges.length > 1 ? "s" : ""} obtenu{badges.length > 1 ? "s" : ""}
            </p>


            <div className="badges-grid">

                {
                    badges.length === 0 ? (

                        <p className="badges-empty">
                            Aucun badge obtenu pour le moment. Joue pour en débloquer !
                        </p>

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

                                {badge.date_obtenu && (
                                    <time>
                                        Obtenu le {new Date(badge.date_obtenu).toLocaleDateString("fr-FR")}
                                    </time>
                                )}

                            </div>

                        ))

                    )
                }

            </div>

        </main>
    );
}


export default Badges;