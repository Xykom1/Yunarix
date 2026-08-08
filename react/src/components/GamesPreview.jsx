import { Link } from "react-router-dom";

function GamesPreview({ gamesRef }) {
    return (
        <section ref={gamesRef} id="jeux" className="games-preview">
            <div className="container">
                <h2>Nos jeux disponibles</h2>
                <div className="game-cards">
                    <div className="game-card">
                        <h3>🎯 Quizz Otaku</h3>
                        <p>Teste tes connaissances sur tes séries et jeux préférés à travers des dizaines de questions !</p>
                        <Link to="/quiz" className="btn-secondary">Jouer</Link>
                    </div>
                    <div className="game-card">
                        <h3>🎵 Blind Test Anime</h3>
                        <p>Reconnais les musiques d'animes en quelques secondes. As-tu l'oreille d’un vrai fan ?</p>
                        <Link to="/blindTest" className="btn-secondary">Jouer</Link>
                    </div>
                    <div className="game-card">
                        <h3>⚔️ Mini-RPG Pixel</h3>
                        <p>Pars à l’aventure dans un monde en pixel art peuplé de références geek et otaku !</p>
                        <Link to="/rpg" className="btn-secondary">Jouer</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GamesPreview;