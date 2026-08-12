import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profil from "./pages/Profil";
import Badges from "./pages/Badges";
import Classement from "./pages/Classement";
import Quiz from "./pages/Quiz";
import Puzzle from "./pages/Puzzle";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";


function App() {
  return (
    <>
      <div className="site-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/profil"
              element={
                <ProtectedRoute>
                  <Profil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/badge"
              element={
                <ProtectedRoute>
                  <Badges />
                </ProtectedRoute>
              }
            />
            <Route path="/classement" element={<Classement />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/cgu" element={<CGU />} />
            <Route
              path="/politiqueConfidentialite"
              element={<PolitiqueConfidentialite />}
            />
            <Route
              path="/mentionsLegales"
              element={<MentionsLegales />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}


export default App;