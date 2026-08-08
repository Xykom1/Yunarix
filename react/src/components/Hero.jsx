function Hero({ gamesRef }) {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Bienvenue sur Yunarix !</h1>
                <p>Plonge dans l’univers des mini-jeux inspirés de tes animes, mangas et jeux vidéo préférés !</p>
                <button
                    className="btn-primary"
                    onClick={() =>
                        gamesRef.current?.scrollIntoView({
                            behavior: "smooth"
                        })
                    }
                >
                    Découvrir les jeux
                </button>
            </div>
        </section>
    );
}

export default Hero;