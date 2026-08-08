import "../assets/css/style_login.css";
import { useState, useEffect } from "react";
import { login as apiLogin } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";


function Login() {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const compteCree = searchParams.get("compte_cree") === "1";
    const [showSuccessMessage, setShowSuccessMessage] = useState(compteCree);
    const [fadeOut, setFadeOut] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");

        const data = await apiLogin(pseudo, password);

        if (data.success) {

            login(); // met logged à true dans le contexte
            navigate("/");

        } else {

            setErrorMessage(data.message);

        }
    };

    useEffect(() => {

        if (!showSuccessMessage) return;

        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 3000);

        const removeTimer = setTimeout(() => {
            setShowSuccessMessage(false);
        }, 4000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };

    }, [showSuccessMessage]);

    return (
        <div className="form-container-connexion">
            <h2>Connexion</h2>
            {showSuccessMessage && (
                <p
                    id="success-message"
                    className={`message-creation ${fadeOut ? "fade-out" : ""}`}
                >
                    Votre compte a bien été créé.
                </p>
            )}
            {errorMessage && (
                <div className="error-message-connexion">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group-connexion">
                    <label htmlFor="pseudo">Pseudo :</label>
                    <input
                        type="text"
                        required
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>
                <div className="form-group-connexion">
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        required
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="form-button-connexion" type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;