import { Link } from "react-router-dom";
import "../assets/css/style_footer.css";

function Footer() {
    return (
        <footer>
            <div className="footer-container">

                <div className="footer-links">
                    <ul>
                        <li>
                            <Link to="/mentionsLegales">
                                Mentions légales
                            </Link>
                        </li>

                        <div className="footer-separator"></div>

                        <li>
                            <Link to="/cgu">
                                CGU
                            </Link>
                        </li>

                        <div className="footer-separator"></div>

                        <li>
                            <Link to="/politiqueConfidentialite">
                                Politique de confidentialité
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className="footer-copyright">
                    <p>&copy; 2025 Yunarix. Tous droits réservés.</p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;