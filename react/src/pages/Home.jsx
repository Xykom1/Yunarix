import Hero from "../components/Hero";
import Presentation from "../components/Presentation";
import GamesPreview from "../components/GamesPreview";
import RankingCommunity from "../components/RankingCommunity";
import { useRef } from "react";

import "../assets/css/style_home.css";

function Home() {
    const gamesRef = useRef(null);
    return (
        <>
            <Hero gamesRef={gamesRef} />
            <Presentation />
            <GamesPreview gamesRef={gamesRef} />
            <RankingCommunity />
        </>
    );
}

export default Home;