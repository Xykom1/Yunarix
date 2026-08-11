import "../assets/css/style_politique_confidentialite.css";

function PolitiqueConfidentialite() {
    return (
        <main className="confidentialite-page">
            <h1>Politique de confidentialité</h1>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    La présente politique de confidentialité décrit comment Yunarix
                    collecte, utilise et protège les données personnelles des utilisateurs
                    du site.
                </p>
                <p>
                    En utilisant Yunarix, vous acceptez les pratiques décrites dans
                    cette politique.
                </p>
            </section>

            <section>
                <h2>2. Données collectées</h2>
                <p>
                    Lors de la création d'un compte, les données suivantes sont collectées :
                </p>
                <ul>
                    <li>Pseudo</li>
                    <li>Adresse e-mail</li>
                    <li>Mot de passe (crypté)</li>
                    <li>Numéro de téléphone (facultatif)</li>
                    <li>Date d'inscription</li>
                </ul>
                <p>
                    Les données de jeu (scores, quiz complétés, badges obtenus) sont
                    également collectées pour permettre le fonctionnement du service.
                </p>
            </section>

            <section>
                <h2>3. Utilisation des données</h2>
                <p>
                    Les données collectées sont utilisées uniquement pour :
                </p>
                <ul>
                    <li>Permettre le fonctionnement du site et des jeux</li>
                    <li>Gérer les comptes utilisateurs</li>
                    <li>Calculer et afficher les scores et classements</li>
                    <li>Attribuer les badges et statistiques</li>
                    <li>Assurer la sécurité de la plateforme</li>
                </ul>
            </section>

            <section>
                <h2>4. Conservation des données</h2>
                <p>
                    Les données personnelles sont conservées pendant toute la durée
                    d'utilisation du compte. En cas de suppression du compte, les données
                    sont supprimées de manière définitive.
                </p>
                <p>
                    Les données de jeu anonymisées peuvent être conservées à des fins
                    statistiques.
                </p>
            </section>

            <section>
                <h2>5. Partage des données</h2>
                <p>
                    Yunarix ne vend pas et ne transmet pas les données personnelles
                    des utilisateurs à des tiers.
                </p>
                <p>
                    Les données ne sont partagées qu'avec les prestataires techniques
                    strictement nécessaires au fonctionnement du site (hébergement,
                    base de données).
                </p>
            </section>

            <section>
                <h2>6. Cookies</h2>
                <p>
                    Yunarix utilise uniquement les cookies strictement nécessaires au
                    fonctionnement du site, notamment pour la gestion des sessions
                    de connexion.
                </p>
                <p>
                    Le site n'utilise pas de cookies publicitaires ou de traçage.
                </p>
            </section>

            <section>
                <h2>7. Droits des utilisateurs</h2>
                <p>
                    Conformément au RGPD, chaque utilisateur dispose des droits suivants :
                </p>
                <ul>
                    <li>Droit d'accès à ses données personnelles</li>
                    <li>Droit de rectification des données inexactes</li>
                    <li>Droit à l'effacement des données</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité des données</li>
                    <li>Droit d'opposition au traitement</li>
                </ul>
            </section>

            <section>
                <h2>8. Sécurité</h2>
                <p>
                    Yunarix met en œuvre des mesures techniques et organisationnelles
                    pour protéger les données personnelles contre tout accès non autorisé,
                    toute perte ou altération.
                </p>
                <p>
                    Les mots de passe sont cryptés et jamais stockés en clair.
                </p>
            </section>

            <section>
                <h2>9. Contact</h2>
                <p>
                    Pour toute question relative à la présente politique de confidentialité
                    ou pour exercer vos droits, vous pouvez nous contacter via :
                </p>
                <ul>
                    <li>E-mail : [Votre adresse email]</li>
                </ul>
            </section>
        </main>
    );
}

export default PolitiqueConfidentialite;