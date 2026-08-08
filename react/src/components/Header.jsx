import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/style_header.css";
import logo from "../assets/images/logo_yunarix.png";
import LogoutModal from "./LogoutModal";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from "../context/AuthContext";


function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { logged, logout } = useAuth();

    useEffect(() => {
        function handleClick() {
            setMenuOpen(false);
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = showLogoutModal ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showLogoutModal]);

    const handleLogout = async () => {

        await logout();

        setShowLogoutModal(false);
        setMenuOpen(false);

    };

    return (
        <>
            <header>
                <div className="container">

                    <Link to="/">
                        <img src={logo} alt="Yunarix" />
                    </Link>

                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Accueil</Link></li>
                            <li><Link to="/classement">Classement</Link></li>
                            <li><Link to="/quiz">Jeux</Link></li>
                        </ul>
                    </nav>

                    {logged ? (

                        <div className="profile-menu">
                            <i
                                className="fas fa-user-circle"
                                id="profile-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpen(!menuOpen);
                                }}
                            ></i>
                            {menuOpen && (
                                <>
                                    <ul className="dropdown-content" id="dropdown-menu">
                                        <li><Link to="/profil">Mon profil</Link></li>
                                        <li><Link to="/badge">Mes badges</Link></li>
                                        <li><Link to="/defis">Mes défis</Link></li>
                                        <li>
                                            <button
                                                className="logout-button"
                                                onClick={() => setShowLogoutModal(true)}
                                            >
                                                Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>

                    ) : (

                        <div className="auth-links">
                            <Link to="/register">Inscription</Link>
                            <Link to="/login">Connexion</Link>
                        </div>

                    )}

                </div>
            </header>

            {showLogoutModal && (
                <LogoutModal
                    onCancel={() => setShowLogoutModal(false)}
                    onConfirm={handleLogout}
                />
            )}
        </>
    );
}

export default Header;