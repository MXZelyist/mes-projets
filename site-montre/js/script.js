/* ===== Éléments de la page (null si absents de la page) ===== */
const montrePop = document.querySelector("#montre");
const legende = document.querySelector("#legende");
const statsSite = document.querySelector("#stats");
const zoneMarques = document.querySelector("#marques");
const listeMontre = document.querySelector("#liste-montre");
const zoneSouhaits = document.querySelector("#souhaits");
const messageVide = document.querySelector("#vide");

/* ===== Classes ===== */

class Montre {
    constructor(nom, prix, diametre, image, mouvement, populaire = false) {
        this.nom = nom;
        this.prix = prix;
        this.diametre = diametre;
        this.image = image;
        this.mouvement = mouvement;
        this.populaire = populaire; // true = affichée sur l'accueil
        this.marque = null; // rempli par Marque.ajouter()
        this.id = null;     // idem, sert à la liste de souhaits
    }
}

class Marque {
    // logo : chemin d'une image, ou null (une initiale s'affiche alors)
    constructor(nom, pays, logo = null) {
        this.nom = nom;
        this.pays = pays;
        this.logo = logo;
        this.montres = [];
    }

    ajouter(...montres) {
        montres.forEach(montre => {
            montre.marque = this;
            montre.id = `${this.nom}-${montre.nom}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            this.montres.push(montre);
        });
        return this;
    }
}

/* ===== Données ===== */

const tissot = new Marque("Tissot", "Suisse"); // ajoute "../img/tissot/logo.png" pour un vrai logo
tissot.ajouter(
    new Montre("PRX bleu", 365, 40, "../img/tissot/prx-bleu.webp", "Quartz", true),
    new Montre("PRX titane", 795, 38, "../img/tissot/prx-titane.webp", "Automatique", true),
    new Montre("PRX chrono noir", 435, 41, "../img/tissot/prx-chrono-noir.webp", "Quartz"),
    new Montre("PRX chrono premium", 1795, 42, "../img/tissot/prx-chrono-premium.webp", "Valjoux automatique", true),
    new Montre("PRX carbone", 965, 40.5, "../img/tissot/prx-carbone.webp", "Automatique"),
    new Montre("tradition", 295, 42, "../img/tissot/tissot-tradition.webp", "Quartz", true),
    
);

const rolex = new Marque("Rolex", "Suisse");
rolex.ajouter(
    //prix réel (0 = « Prix sur demande »)
);

const marques = [tissot, rolex]; // ajoute ici chaque nouvelle marque
const toutesLesMontres = marques.flatMap(marque => marque.montres);

/* ===== Liste de souhaits (enregistrée dans le navigateur) ===== */

const CLE_SOUHAITS = "chronoid-souhaits";

function lireSouhaits() {
    try {
        return JSON.parse(localStorage.getItem(CLE_SOUHAITS)) || [];
    } catch (erreur) {
        return [];
    }
}

function ecrireSouhaits(ids) {
    try {
        localStorage.setItem(CLE_SOUHAITS, JSON.stringify(ids));
    } catch (erreur) {
        // stockage indisponible : on ignore
    }
}

function basculerSouhait(montre) {
    const ids = lireSouhaits();
    const nouveaux = ids.includes(montre.id)
        ? ids.filter(id => id !== montre.id)
        : [...ids, montre.id];
    ecrireSouhaits(nouveaux);
}

/* ===== Éléments réutilisables ===== */

function formaterPrix(prix) {
    return prix > 0 ? `${prix.toLocaleString("fr-CH")} chf` : "Prix sur demande";
}

function pluriel(nombre, mot) {
    return `${nombre} ${mot}${nombre > 1 ? "s" : ""}`;
}

function creerCarte(montre) {
    const carte = document.createElement("div");
    carte.className = "montre";

    const img = document.createElement("img");
    img.src = montre.image;
    img.alt = `${montre.marque.nom} ${montre.nom}`;

    const infos = document.createElement("div");
    infos.className = "infos";
    infos.innerHTML = `<h3>${montre.nom}</h3>
        <p class="prix">${formaterPrix(montre.prix)}</p>
        <p class="details">${montre.diametre} mm, ${montre.mouvement}</p>`;

    const coeur = document.createElement("button");
    coeur.type = "button";
    coeur.className = "coeur";
    majCoeur(coeur, montre);
    coeur.addEventListener("click", () => {
        basculerSouhait(montre);
        majCoeur(coeur, montre);
        if (zoneSouhaits) afficherSouhaits(); // la montre disparaît de la liste
    });

    carte.append(coeur, img, infos);
    return carte;
}

function majCoeur(bouton, montre) {
    const actif = lireSouhaits().includes(montre.id);
    bouton.textContent = actif ? "♥" : "♡";
    bouton.setAttribute("aria-pressed", actif);
    bouton.setAttribute("aria-label",
        actif ? `Retirer ${montre.nom} de la liste de souhaits`
              : `Ajouter ${montre.nom} à la liste de souhaits`);
}

/* ===== Accueil ===== */

if (montrePop) {
    const populaires = toutesLesMontres.filter(montre => montre.populaire);
    const aAfficher = populaires.length > 0 ? populaires : toutesLesMontres;
    let position = 0;

    const afficher = () => {
        const montre = aAfficher[position];
        montrePop.src = montre.image;
        montrePop.alt = `${montre.marque.nom} ${montre.nom}`;
        legende.textContent = `Montre populaire : ${montre.marque.nom} ${montre.nom}`;
        position = (position + 1) % aAfficher.length;
    };
    afficher();
    setInterval(afficher, 2500);
}

if (statsSite) {
    statsSite.textContent =
        `Pour l'instant : ${pluriel(marques.length, "marque")} et ${pluriel(toutesLesMontres.length, "montre")} à découvrir.`;
}

/* ===== Liste de montres : logos de marques cliquables ===== */

let marqueOuverte = null;

if (zoneMarques && listeMontre) {
    marques.forEach(marque => zoneMarques.appendChild(creerBoutonMarque(marque)));
    afficherConsigne();
}

function creerLogo(marque) {
    if (marque.logo) {
        const img = document.createElement("img");
        img.src = marque.logo;
        img.alt = "";
        img.className = "logo-marque";
        return img;
    }
    const initiale = document.createElement("span");
    initiale.className = "logo-marque initiale";
    initiale.textContent = marque.nom.charAt(0);
    return initiale;
}

function creerBoutonMarque(marque) {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "marque-btn";
    bouton.setAttribute("aria-expanded", "false");
    bouton.setAttribute("aria-controls", "liste-montre");

    const nom = document.createElement("span");
    nom.className = "nom-marque";
    nom.textContent = marque.nom;

    const compte = document.createElement("span");
    compte.className = "compte";
    compte.textContent = pluriel(marque.montres.length, "montre");

    bouton.append(creerLogo(marque), nom, compte);
    bouton.addEventListener("click", () => ouvrirMarque(marque, bouton));
    return bouton;
}

function afficherConsigne() {
    const consigne = document.createElement("p");
    consigne.className = "vide";
    consigne.textContent = "Cliquez sur une marque pour afficher ses montres.";
    listeMontre.replaceChildren(consigne);
}

function ouvrirMarque(marque, bouton) {
    const dejaOuverte = marqueOuverte === marque;

    zoneMarques.querySelectorAll(".marque-btn").forEach(autre => {
        autre.classList.remove("active");
        autre.setAttribute("aria-expanded", "false");
    });

    if (dejaOuverte) {
        marqueOuverte = null;
        afficherConsigne();
        return;
    }

    marqueOuverte = marque;
    bouton.classList.add("active");
    bouton.setAttribute("aria-expanded", "true");

    const titre = document.createElement("h2");
    titre.textContent = marque.nom;

    const grille = document.createElement("div");
    grille.className = "montres-marque";
    marque.montres.forEach(montre => grille.appendChild(creerCarte(montre)));

    listeMontre.replaceChildren(titre, grille);
    listeMontre.scrollIntoView({ block: "nearest" });
}

/* ===== Liste de souhaits ===== */

if (zoneSouhaits) {
    afficherSouhaits();
}

function afficherSouhaits() {
    const ids = lireSouhaits();
    const souhaits = toutesLesMontres.filter(montre => ids.includes(montre.id));
    zoneSouhaits.replaceChildren(...souhaits.map(creerCarte));
    messageVide.hidden = souhaits.length > 0;
}