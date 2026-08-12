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
                        <h3>⚔️ Puzzle style Manga</h3>
                        <p>Essaye de résoudre des puzzle de différents personnages ayant un style Manga ! </p>
                        <Link to="/puzzle" className="btn-secondary">Jouer</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GamesPreview;