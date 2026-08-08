import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RankingCommunity() {
    const { logged } = useAuth();
    return (
        <section className="ranking-community">
            <div className="container">
                <h2>Classement & Communauté</h2>
                <p>Grimpe dans le classement, compare tes scores avec tes amis, et deviens une légende du monde otaku !</p>
                <div className="ranking-buttons">
                    <Link to="/classement" className="btn-tertiary">Voir le classement</Link>
                    {!logged && (
                        <Link to="/login" className="btn-tertiary">
                            Se connecter
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default RankingCommunity;