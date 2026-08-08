import { credits } from "../data/credits";
import "../assets/css/style_mentions_legales.css";

function MentionsLegales() {

    return (
        <main className="legal-page">

            <h1>Mentions légales</h1>

            <section>
                <h2>1. Éditeur du site</h2>

                <p>
                    Le site Yunarix est édité par [Votre nom].
                </p>

                <p>
                    Contact : [Votre adresse email]
                </p>
            </section>


            <section>
                <h2>2. Hébergement</h2>

                <p>
                    Le site est hébergé par :
                </p>

                <p>
                    [Nom de l'hébergeur]<br />
                    [Adresse de l'hébergeur]
                </p>
            </section>


            <section>
                <h2>3. Propriété intellectuelle</h2>

                <p>
                    L'ensemble du contenu présent sur Yunarix
                    (textes, graphismes, logos, éléments graphiques)
                    est protégé par les lois relatives à la propriété intellectuelle.
                </p>

                <p>
                    Les contenus appartenant à des tiers restent la propriété
                    de leurs auteurs respectifs.
                </p>
            </section>


            <section>
                <h2>4. Protection des données personnelles</h2>

                <p>
                    Les informations collectées lors de la création d'un compte
                    sont utilisées uniquement pour permettre le fonctionnement
                    du site.
                </p>

                <p>
                    Les données ne sont pas vendues ni transmises à des tiers.
                </p>
            </section>


            <section>
                <h2>5. Cookies</h2>

                <p>
                    Yunarix utilise uniquement les éléments nécessaires au
                    fonctionnement du site.
                </p>
            </section>


            <section>
                <h2>6. Crédits et ressources utilisées</h2>

                <p>
                    Certaines ressources graphiques utilisées sur Yunarix
                    proviennent de créateurs externes. Les licences et conditions
                    d'utilisation de chaque ressource sont respectées.
                </p>

                <h3>Icônes des badges</h3>


                <ul className="credits-list">
                    {
                        credits.map((credit, index) => (
                            <li key={index}>
                                <strong>{credit.nom}</strong><br />
                                Auteur : {credit.auteur}<br />
                                Source : {credit.source}<br />
                                Lien : <a href={credit.lien} target="_blank" rel="noopener noreferrer">{credit.lien}</a><br />
                            </li>
                        ))
                    }
                </ul>



                <h3>Autres ressources graphiques</h3>

                <ul className="credits-list">
                    <li>
                        Logo Yunarix : création personnelle
                    </li>
                </ul>

            </section>


        </main>
    );
}

export default MentionsLegales;