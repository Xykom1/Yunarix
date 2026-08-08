import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authApi";
import "../assets/css/style_register.css";
function Register() {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [terms, setTerms] = useState(false);
    const passwordMismatch =
        password !== "" &&
        confirmPassword !== "" &&
        password !== confirmPassword;

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = await register({
            pseudo,
            email,
            password,
            confirmPassword,
            phone,
            terms
        });

        if (data.success) {

            window.location.href = "/login?compte_cree=1";

        } else {

            setErrors(data.errors);

        }

    };

    return (
        <div className="form-container-inscription">
            <h2>Créer un compte</h2>

            {errors.length > 0 && (
                <div className="message-suppression" style={{ backgroundColor: "red" }}>
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group-inscription">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        id="pseudo"
                        required
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>

                <div className="form-group-inscription">
                    <label htmlFor="email">Adresse e-mail</label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group-inscription">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        className={passwordMismatch ? "error" : ""}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordMismatch && (
                        <i className="fas fa-exclamation-circle error-icon"></i>
                    )}
                </div>

                <div className="form-group-inscription">
                    <label htmlFor="confirm_password">Confirmation du mot de passe</label>
                    <input
                        type="password"
                        id="confirm_password"
                        className={passwordMismatch ? "error" : ""}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordMismatch && (
                        <i className="fas fa-exclamation-circle error-icon"></i>
                    )}
                </div>

                <div className="form-group-inscription">
                    <label htmlFor="phone">Numéro de téléphone :</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="form-group-inscription" id="form-group-terms-inscription">
                    <input
                        type="checkbox"
                        id="terms"
                        required
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                    />
                    <label htmlFor="terms" className="checkbox-label">J'accepte les <Link to="/cgu">conditions d'utilisation</Link></label>
                </div>

                <button type="submit" className="form-button-inscription">S'inscrire</button>
            </form>

            <p style={{ marginTop: "20px" }}>Déjà un compte ? <Link className="lien-connexion" to="/login">Connectez-vous</Link></p>
        </div>
    );
}

export default Register;