/* ===== Éléments de la page (null si absents de la page) ===== */
const montrePop = document.querySelector("#montre");
const legende = document.querySelector("#legende");
const statsSite = document.querySelector("#stats");
const zoneMarques = document.querySelector("#marques");
const listeMontre = document.querySelector("#liste-montre");
const zoneSouhaits = document.querySelector("#souhaits");
const messageVide = document.querySelector("#vide");
const resume = document.querySelector("#resume");
const totalSouhaits = document.querySelector("#total");
const boutonVider = document.querySelector("#vider");
const zoneUne = document.querySelector("#une");
const zoneDetail = document.querySelector("#detail");
const zoneComparaison = document.querySelector("#comparaison");
const messageVideComparer = document.querySelector("#vide-comparer");
const boutonTheme = document.querySelector("#theme");
const boutonBurger = document.querySelector("#burger");
const menu = document.querySelector("#menu");
const zoneQuiz = document.querySelector("#quiz");
const zoneResultats = document.querySelector("#resultats");

/* ===== Classes ===== */

class Montre {
    // extra : { etancheite, boitier, cadran, annee, description, usages }
    constructor(nom, prix, diametre, image, mouvement, populaire = false, extra = {}) {
        this.nom = nom;
        this.prix = prix;
        this.diametre = diametre;
        this.image = image;
        this.mouvement = mouvement;
        this.populaire = populaire; // true = affichée sur l'accueil
        this.etancheite = extra.etancheite ?? null;
        this.boitier = extra.boitier ?? null;
        this.cadran = extra.cadran ?? null;
        this.annee = extra.annee ?? null;
        this.description = extra.description ?? null;
        this.usages = extra.usages ?? []; // quotidien, sport, habille
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
/* Les infos supplémentaires (étanchéité, boîtier, cadran, année, description)
   sont à vérifier avant de publier le site. */

const tissot = new Marque("Tissot", "Suisse"); // ajoute "../img/tissot/logo.png" pour un vrai logo
tissot.ajouter(
    new Montre("PRX bleu", 365, 40, "../img/tissot/prx-bleu.webp", "Quartz", true, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu", annee: 2021,
        description: "Inspirée des années 70, la PRX allie bracelet intégré et cadran texturé. Une montre à quartz simple et fiable."
    }),
    new Montre("PRX titane", 795, 38, "../img/tissot/prx-titane.webp", "Automatique", true, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Titane", cadran: "Gris", annee: 2023,
        description: "Un boîtier en titane, léger et résistant, pour une PRX automatique au poignet très confortable."
    }),
    new Montre("PRX chrono noir", 435, 41, "../img/tissot/prx-chrono-noir.webp", "Quartz", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir", annee: 2022,
        description: "La version chronographe de la PRX, avec un cadran noir sobre et trois compteurs."
    }),
    new Montre("PRX chrono premium", 1795, 42, "../img/tissot/prx-chrono-premium.webp", "Valjoux automatique", true, {
        usages: ["habille", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu", annee: 2023,
        description: "Un chronographe automatique équipé d'un mouvement Valjoux, le haut de gamme de la famille PRX."
    }),
    new Montre("PRX carbone", 965, 40.5, "../img/tissot/prx-carbone.webp", "Automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Carbone forgé", cadran: "Noir", annee: 2025,
        description: "Un boîtier en carbone forgé au motif unique sur chaque pièce, pour une PRX moderne et très légère."
    }),
    new Montre("Tradition", 295, 42, "../img/tissot/tissot-tradition.webp", "Quartz", true, {
        usages: ["habille", "quotidien"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable", cadran: "Blanc", annee: 2010,
        description: "Une montre classique et élégante, facile à porter tous les jours."
    }),

    // --- Nouveaux modèles (photos à ajouter dans img/tissot/) ---
    new Montre("PRX Powermatic 80 bleu", 685, 40, "../img/tissot/prx-powermatic-80-bleu.webp", "Powermatic 80 automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu", annee: 2021,
        description: "La PRX en version automatique : le même design inspiré des années 70, avec un mouvement mécanique et 80 heures de réserve de marche."
    }),
    new Montre("Seastar 1000 bleu", 695, 40, "../img/tissot/seastar-1000-bleu.webp", "Powermatic 80 automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable", cadran: "Bleu", annee: 2024,
        description: "Une montre de plongée à lunette tournante, étanche à 300 m, avec un cadran dégradé et 80 heures de réserve de marche."
    }),
    new Montre("Seastar 1000 PVD noir", 765, 40, "../img/tissot/seastar-1000-pvd-noir.webp", "Powermatic 80 automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable PVD noir", cadran: "Gris", annee: 2024,
        description: "La Seastar 1000 en version sombre : boîtier en acier traité PVD noir et cadran dégradé gris-noir."
    }),
    new Montre("Gentleman bleu", 795, 40, "../img/tissot/gentleman-bleu.webp", "Powermatic 80 automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "Une montre classique et élégante pour tous les jours, avec un fond transparent qui laisse voir le mouvement automatique."
    }),
    new Montre("Gentleman noir cuir", 735, 40, "../img/tissot/gentleman-noir-cuir.webp", "Powermatic 80 automatique", false, {
        usages: ["habille", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "La Gentleman à cadran noir et bracelet en cuir : plus sobre et plus habillée."
    }),
    new Montre("PR 100 vert", 285, 40, "../img/tissot/pr-100-vert.webp", "Quartz", false, {
        usages: ["quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Vert",
        description: "La classique robuste de Tissot, étanche à 100 m, avec un cadran vert et un mouvement à quartz suisse."
    }),

    // --- 38 modèles supplémentaires (photos à ajouter dans img/tissot/) ---
    new Montre("PRX 35 noir", 685, 35, "../img/tissot/prx-35-noir.webp", "Powermatic 80 automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir", annee: 2023,
        description: "La PRX en 35 mm, plus compacte, avec le cadran noir texturé et le mouvement automatique à 80 heures de réserve."
    }),
    new Montre("Le Locle vert", 655, 39.3, "../img/tissot/le-locle-vert.webp", "Powermatic 80 automatique", false, {
        usages: ["habille", "quotidien"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable", cadran: "Vert",
        description: "Une montre classique au cadran vert guilloché, avec chiffres romains et bracelet à changement rapide sans outil."
    }),
    new Montre("Le Locle 20e anniversaire", 695, 39.3, "../img/tissot/le-locle-20e-anniversaire.webp", "Powermatic 80 automatique", false, {
        usages: ["habille", "quotidien"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable", cadran: "Argent", annee: 2023,
        description: "L'édition des 20 ans de la collection Le Locle, livrée avec un bracelet acier et un bracelet cuir bleu foncé."
    }),
    new Montre("Le Locle or rose", 1865, 39.3, "../img/tissot/le-locle-or-rose.webp", "Powermatic 80 automatique", false, {
        usages: ["habille", "quotidien"], etancheite: "3 bar (30 m)", boitier: "Acier et or rose", cadran: "Bleu",
        description: "La Le Locle haut de gamme : lunette cannelée en or rose 18 carats, cadran bleu et bracelet cuir assorti."
    }),
    new Montre("PR 100 bleu glacier", 285, 40, "../img/tissot/pr-100-bleu-glacier.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "La PR 100, précise, robuste et étanche à 100 m, dans un bleu glacier discret."
    }),
    new Montre("PR 100 blanc", 265, 40, "../img/tissot/pr-100-blanc.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Blanc",
        description: "La version la plus simple de la PR 100, avec un cadran blanc très lisible."
    }),
    new Montre("PR 100 noir", 265, 40, "../img/tissot/pr-100-noir.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "La PR 100 à cadran noir : sobre, robuste et facile à porter tous les jours."
    }),
    new Montre("PR 100 noir PVD or rose", 395, 40, "../img/tissot/pr-100-noir-pvd-or-rose.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable PVD or rose", cadran: "Noir",
        description: "La PR 100 avec boîtier et bracelet traités PVD or rose, pour un style plus habillé."
    }),
    new Montre("PR 100 blanc PVD or jaune", 345, 40, "../img/tissot/pr-100-blanc-pvd-or-jaune.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable PVD or jaune", cadran: "Blanc",
        description: "La PR 100 à cadran blanc, avec un boîtier traité PVD or jaune."
    }),
    new Montre("Gentleman vert", 795, 40, "../img/tissot/gentleman-vert.webp", "Powermatic 80 automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Vert",
        description: "La Gentleman sur bracelet acier, avec un cadran vert qui apporte de la couleur à une montre classique."
    }),
    new Montre("Gentleman anthracite", 795, 40, "../img/tissot/gentleman-anthracite.webp", "Powermatic 80 automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Gris",
        description: "La Gentleman à cadran anthracite, élégante et discrète, avec 80 heures de réserve de marche."
    }),
    new Montre("Gentleman bleu glacier", 795, 40, "../img/tissot/gentleman-bleu-glacier.webp", "Powermatic 80 automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "La Gentleman à cadran bleu glacier, fond transparent et verre saphir bombé."
    }),
    new Montre("Supersport Chrono noir", 455, 45.5, "../img/tissot/supersport-chrono-noir.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "Un grand chronographe à quartz au look sportif, avec des index épais très lisibles de nuit."
    }),
    new Montre("Supersport Chrono bleu", 455, 45.5, "../img/tissot/supersport-chrono-bleu.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "Le chronographe Supersport à cadran bleu, étanche à 100 m, avec bracelet acier à changement rapide."
    }),
    new Montre("Supersport Chrono bleu glacier 42", 465, 42, "../img/tissot/supersport-chrono-bleu-glacier-42.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "Une Supersport Chrono plus compacte (42 mm) au cadran bleu glacier."
    }),
    new Montre("Supersport Chrono PVD noir", 445, 45.5, "../img/tissot/supersport-chrono-pvd-noir.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable PVD noir", cadran: "Noir",
        description: "Le chronographe Supersport tout en noir, avec un boîtier traité PVD noir."
    }),
    new Montre("Supersport Chrono PVD or rose", 455, 45.5, "../img/tissot/supersport-chrono-pvd-or-rose.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable PVD or rose", cadran: "Noir",
        description: "Le chronographe Supersport à cadran noir et boîtier traité PVD or rose."
    }),
    new Montre("Supersport Chrono PVD or jaune", 475, 45.5, "../img/tissot/supersport-chrono-pvd-or-jaune.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable PVD or jaune", cadran: "Noir",
        description: "Le chronographe Supersport à cadran noir et boîtier traité PVD or jaune, pour un look affirmé."
    }),
    new Montre("Supersport Chrono noir et bleu", 425, 45.5, "../img/tissot/supersport-chrono-noir-et-bleu.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "Un chronographe sportif à cadran noir avec compteurs bleus et bracelet en tissu bleu."
    }),
    new Montre("Everytime 40 blanc", 265, 40, "../img/tissot/everytime-40-blanc.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Blanc",
        description: "Une montre fine et minimaliste, pensée pour toutes les occasions, avec bracelet à changement rapide."
    }),
    new Montre("Everytime 40 bleu", 275, 40, "../img/tissot/everytime-40-bleu.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "L'Everytime à cadran bleu foncé, avec aiguilles et index argentés."
    }),
    new Montre("Everytime 40 argent", 275, 40, "../img/tissot/everytime-40-argent.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Argent",
        description: "L'Everytime à cadran argenté, simple, claire et facile à assortir."
    }),
    new Montre("Everytime 38 noir", 275, 38, "../img/tissot/everytime-38-noir.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "L'Everytime en 38 mm, fine (6,5 mm d'épaisseur) et idéale pour un petit poignet."
    }),
    new Montre("Chrono XL vert cuir", 345, 45, "../img/tissot/chrono-xl-vert-cuir.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Vert",
        description: "Un grand chronographe de 45 mm au cadran vert, sur bracelet cuir brun."
    }),
    new Montre("Chrono XL bleu", 395, 45, "../img/tissot/chrono-xl-bleu.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "Le chronographe Chrono XL à cadran bleu et bracelet acier."
    }),
    new Montre("Chrono XL noir", 395, 45, "../img/tissot/chrono-xl-noir.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "Le chronographe Chrono XL à cadran noir et bracelet acier."
    }),
    new Montre("Chrono XL noir cuir", 345, 45, "../img/tissot/chrono-xl-noir-cuir.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "Le Chrono XL à cadran noir sur bracelet cuir, plus classique."
    }),
    new Montre("Carson Premium argent", 685, 40, "../img/tissot/carson-premium-argent.webp", "Powermatic 80 automatique", false, {
        usages: ["habille", "quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Argent", annee: 2019,
        description: "Une montre élégante au cadran argenté avec chiffres romains, fond transparent et 80 heures de réserve."
    }),
    new Montre("Carson Premium noir", 685, 40, "../img/tissot/carson-premium-noir.webp", "Powermatic 80 automatique", false, {
        usages: ["habille", "quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Noir", annee: 2019,
        description: "La Carson Premium à cadran noir, classique et intemporelle, avec mouvement automatique."
    }),
    new Montre("PRX noir", 365, 40, "../img/tissot/prx-noir.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir", annee: 2021,
        description: "La PRX à quartz au cadran noir : bracelet intégré, design des années 70 et prix accessible."
    }),
    new Montre("PRX vert", 365, 40, "../img/tissot/prx-vert.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Vert", annee: 2021,
        description: "La PRX à quartz avec un cadran vert clair, au look rétro."
    }),
    new Montre("PRX bleu cuir", 325, 40, "../img/tissot/prx-bleu-cuir.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Bleu", annee: 2021,
        description: "La PRX à quartz à cadran bleu, montée sur bracelet cuir bleu pour un style plus décontracté."
    }),
    new Montre("PRX rouge", 450, 40, "../img/tissot/prx-rouge.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Rouge", annee: 2021,
        description: "La PRX à quartz au cadran rouge, la plus audacieuse de la gamme."
    }),
    new Montre("PRX blanc caoutchouc", 425, 40, "../img/tissot/prx-blanc-caoutchouc.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Blanc", annee: 2021,
        description: "La PRX à quartz à cadran blanc, sur bracelet caoutchouc blanc."
    }),
    new Montre("Classic Dream argent", 295, 42, "../img/tissot/classic-dream-argent.webp", "Quartz", false, {
        usages: ["habille", "quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Argent",
        description: "Une montre classique et minimaliste, avec aiguilles dauphine et bracelet acier robuste."
    }),
    new Montre("Classic Dream noir", 295, 42, "../img/tissot/classic-dream-noir.webp", "Quartz", false, {
        usages: ["habille", "quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "La Classic Dream à cadran noir et chiffres romains."
    }),
    new Montre("Classic Dream blanc", 295, 42, "../img/tissot/classic-dream-blanc.webp", "Quartz", false, {
        usages: ["habille", "quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Blanc",
        description: "La Classic Dream à cadran blanc et chiffres romains, très lisible."
    }),
    new Montre("Classic Dream ivoire", 295, 42, "../img/tissot/classic-dream-ivoire.webp", "Quartz", false, {
        usages: ["habille", "quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable PVD or jaune", cadran: "Ivoire",
        description: "La Classic Dream à cadran ivoire, boîtier traité PVD or jaune et bracelet cuir brun à changement rapide."
    })
);

const rolex = new Marque("Rolex", "Suisse");
rolex.ajouter(
    // prix réel (0 = « Prix sur demande »)
    new Montre("Datejust vert", 0, 36, "../img/rolex/datejust-vert.webp", "Automatique", false, {
        usages: ["quotidien", "habille"],
        etancheite: "10 bar (100 m)",
        boitier: "Acier et or blanc",
        cadran: "Vert",
        annee: 2026,
        description: "La Datejust classique avec sa lunette cannelée en or blanc, son bracelet Oyster et un cadran vert dégradé."
    }),

    new Montre("Daytona", 0, 40, "../img/rolex/daytona.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Blanc", annee: 2023,
        description: "Le chronographe de course de Rolex, avec lunette en céramique et cadran blanc à compteurs contrastés."
    }),
    new Montre("Submariner Date", 0, 41, "../img/rolex/submariner-date.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable", cadran: "Noir", annee: 2020,
        description: "La montre de plongée de référence : étanche à 300 m, lunette tournante en céramique et cadran noir."
    }),
    new Montre("GMT-Master II", 0, 40, "../img/rolex/gmt-master-ii.webp", "Automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir", annee: 2019,
        description: "Une montre de voyage qui affiche un deuxième fuseau horaire, avec une lunette bicolore bleu et noir."
    }),
    new Montre("Datejust 41", 0, 41, "../img/rolex/datejust-41.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier et or blanc", cadran: "Bleu", annee: 2017,
        description: "La Datejust en 41 mm avec lunette cannelée en or blanc et cadran bleu : le grand classique de Rolex."
    })
);

/* ----- Très haut de gamme (prix à renseigner : 0 = « Prix sur demande ») ----- */

const patek = new Marque("Patek Philippe", "Suisse");
patek.ajouter(
    new Montre("Nautilus 5811", 0, 41, "../img/patek/nautilus-5811.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "12 bar (120 m)", boitier: "Or blanc", cadran: "Bleu", annee: 2022,
        description: "L'icône sportive-chic de Patek Philippe, avec son boîtier octogonal arrondi et son cadran bleu strié."
    }),
    new Montre("Aquanaut 5167A", 0, 40, "../img/patek/aquanaut-5167a.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "12 bar (120 m)", boitier: "Acier inoxydable", cadran: "Noir", annee: 2007,
        description: "La Aquanaut en acier, reconnaissable à son cadran noir gaufré et à son bracelet en composite."
    }),
    new Montre("Calatrava 6119G", 0, 39, "../img/patek/calatrava-6119g.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Or blanc",
        description: "La montre habillée par excellence de la marque : boîtier rond en or blanc, ligne fine et sobre."
    }),
    new Montre("Grand Complications 5270P", 0, 41, "../img/patek/grand-complications-5270p.webp", "Chronographe à remontage manuel, quantième perpétuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Platine",
        description: "Un chronographe avec calendrier perpétuel, l'une des grandes complications de la haute horlogerie."
    })
);

const audemars_piguet = new Marque("Audemars Piguet", "Suisse");
audemars_piguet.ajouter(
    new Montre("Royal Oak 15510", 0, 41, "../img/audemars-piguet/royal-oak-15510.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Bleu", annee: 2022,
        description: "La Royal Oak, avec sa lunette octogonale à huit vis et son cadran bleu au motif « Grande Tapisserie »."
    }),
    new Montre("Royal Oak Offshore 26470", 0, 42, "../img/audemars-piguet/royal-oak-offshore-26470.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "La version plus imposante et plus sportive de la Royal Oak, en chronographe."
    }),
    new Montre("Code 11.59", 0, 41, "../img/audemars-piguet/code-11-59.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Or blanc", annee: 2019,
        description: "Une montre ronde et élégante, au boîtier à double courbure, qui sort des codes de la Royal Oak."
    })
);

const vacheron_constantin = new Marque("Vacheron Constantin", "Suisse");
vacheron_constantin.ajouter(
    new Montre("Overseas 4500V", 0, 41, "../img/vacheron-constantin/overseas-4500v.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "15 bar (150 m)", boitier: "Acier inoxydable", cadran: "Bleu", annee: 2016,
        description: "La montre sportive de Vacheron Constantin, avec sa lunette en croix de Malte et ses bracelets interchangeables."
    }),
    new Montre("Patrimony 85180", 0, 40, "../img/vacheron-constantin/patrimony-85180.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Or blanc",
        description: "Une montre habillée très fine, dans la tradition des montres classiques de la maison."
    })
);

const a_lange_sohne = new Marque("A. Lange & Söhne", "Allemagne");
a_lange_sohne.ajouter(
    new Montre("Lange 1", 0, 38.5, "../img/a-lange-sohne/lange-1.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Or rose",
        description: "L'emblème de la marque, avec son cadran asymétrique et son grand guichet de date."
    }),
    new Montre("Zeitwerk", 0, 41.9, "../img/a-lange-sohne/zeitwerk.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: null,
        description: "Une montre à affichage numérique de l'heure, avec des disques sautants, d'une grande complexité mécanique."
    })
);

const breguet = new Marque("Breguet", "Suisse");
breguet.ajouter(
    new Montre("Classique 7147", 0, 40, "../img/breguet/classique-7147.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Or",
        description: "Une montre classique aux lignes pures, avec le guillochage et les aiguilles typiques de Breguet."
    }),
    new Montre("Marine 5517", 0, 40, "../img/breguet/marine-5517.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Or",
        description: "La montre de la collection Marine, étanche à 100 m, avec un cadran guilloché ondé."
    }),
    new Montre("Type XX 2067", 0, 42, "../img/breguet/type-xx-2067.webp", "Chronographe automatique", false, {
        usages: ["sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "Un chronographe inspiré des montres d'aviateur, avec cadran noir et lunette tournante."
    }),
    new Montre("Tradition 7057", 0, 40, "../img/breguet/tradition-7057.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Or",
        description: "Une montre au mécanisme visible sur le cadran, dans l'esprit des montres de poche d'origine."
    })
);

const blancpain = new Marque("Blancpain", "Suisse");
blancpain.ajouter(
    new Montre("Fifty Fathoms Automatique 5015", 0, 45, "../img/blancpain/fifty-fathoms-automatique-5015.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "La plus ancienne montre de plongée moderne : lunette tournante et étanchéité de 300 m."
    }),
    new Montre("Villeret Ultra-Slim 6651", 0, 40, "../img/blancpain/villeret-ultra-slim-6651.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Or",
        description: "Une montre fine et élégante de la collection Villeret, avec un cadran en émail ou opalin."
    }),
    new Montre("Bathyscaphe 5100", 0, 43.6, "../img/blancpain/bathyscaphe-5100.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée plus moderne, au cadran sobre et étanche à 300 m."
    })
);

const hamilton = new Marque("Hamilton", "Suisse");
hamilton.ajouter(
    new Montre("Khaki Field Mechanical 38 noir", 550, 38, "../img/hamilton/khaki-field-mechanical-38-noir.webp", "Remontage manuel", false, {
        usages: ["quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "Une montre de terrain inspirée des modèles militaires des années 60, à remontage manuel, avec 80 heures de réserve de marche."
    }),
    new Montre("Khaki Field Mechanical 38 bleu", 550, 38, "../img/hamilton/khaki-field-mechanical-38-bleu.webp", "Remontage manuel", false, {
        usages: ["quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Bleu",
        description: "La Khaki Field Mechanical en 38 mm avec un cadran bleu, sur bracelet textile."
    }),
    new Montre("Khaki Field Mechanical 38 brun", 550, 38, "../img/hamilton/khaki-field-mechanical-38-brun.webp", "Remontage manuel", false, {
        usages: ["quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "La Khaki Field Mechanical en 38 mm à cadran brun foncé, avec chiffres lumineux très lisibles."
    }),
    new Montre("Khaki Field Mechanical Power Reserve 40", 845, 40, "../img/hamilton/khaki-field-mechanical-power-reserve-40.webp", "Remontage manuel", false, {
        usages: ["quotidien"], boitier: "Acier inoxydable",
        description: "Une Khaki Field Mechanical de 40 mm équipée d'un indicateur de réserve de marche."
    }),

    new Montre("Khaki Aviation Pilot Day Date", 0, 42, "../img/hamilton/khaki-aviation-pilot-day-date.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre d'aviateur à jour et date, au cadran très lisible."
    }),
    new Montre("Jazzmaster Thinline", 0, 40, "../img/hamilton/jazzmaster-thinline.webp", "Quartz", false, {
        usages: ["habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre fine et élégante à quartz."
    }),
    new Montre("Jazzmaster Open Heart", 0, 40, "../img/hamilton/jazzmaster-open-heart.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre classique dont le cadran laisse voir le balancier."
    }),
    new Montre("Ventura Automatic", 0, 42.5, "../img/hamilton/ventura-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "La montre asymétrique rendue célèbre par le cinéma (boîtier de 42,5 × 44,6 mm)."
    })
);

const omega = new Marque("Omega", "Suisse");
omega.ajouter(
    new Montre("Speedmaster Moonwatch Professional", 0, 42, "../img/omega/speedmaster-moonwatch-professional.webp", "Chronographe à remontage manuel", false, {
        usages: ["sport", "quotidien"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "Le chronographe de la conquête spatiale, porté lors des missions Apollo."
    }),
    new Montre("Seamaster Diver 300M", 0, 42, "../img/omega/seamaster-diver-300m.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable", cadran: "Noir",
        description: "La montre de plongée d'Omega, étanche à 300 m, avec lunette tournante en céramique."
    }),
    new Montre("Constellation", 0, 41, "../img/omega/constellation.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre élégante, reconnaissable à ses « griffes » sur le boîtier."
    }),
    new Montre("De Ville Prestige", 0, 39.5, "../img/omega/de-ville-prestige.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre habillée classique, aux aiguilles fines et aux index appliqués."
    })
);

const cartier = new Marque("Cartier", "France");
cartier.ajouter(
    new Montre("Tank Must", 0, 33.7, "../img/cartier/tank-must.webp", "Quartz", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "La montre rectangulaire de Cartier (25,5 × 33,7 mm), avec chiffres romains et cabochon au remontoir."
    }),
    new Montre("Santos de Cartier", 0, 39.8, "../img/cartier/santos-de-cartier.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Un boîtier carré aux vis apparentes et au bracelet à changement rapide (39,8 × 47,5 mm)."
    }),
    new Montre("Ballon Bleu de Cartier 40", 0, 40, "../img/cartier/ballon-bleu-de-cartier-40.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre ronde au boîtier galbé, avec la couronne protégée par un cabochon bleu."
    })
);

const jaeger_lecoultre = new Marque("Jaeger-LeCoultre", "Suisse");
jaeger_lecoultre.ajouter(
    new Montre("Reverso Classic Large", 0, 45.6, "../img/jaeger-lecoultre/reverso-classic-large.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "La montre qui se retourne : un boîtier rectangulaire pivotant (27,4 × 45,6 mm), créé en 1931."
    }),
    new Montre("Polaris Automatic", 0, 41, "../img/jaeger-lecoultre/polaris-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre sportive à lunette intérieure tournante, inspirée des années 60."
    }),
    new Montre("Master Ultra Thin", 0, 39, "../img/jaeger-lecoultre/master-ultra-thin.webp", "Automatique", false, {
        usages: ["habille"], boitier: "Acier inoxydable",
        description: "Une montre extra-plate et épurée, au mouvement automatique très fin."
    }),
    new Montre("Master Control Date", 0, 40, "../img/jaeger-lecoultre/master-control-date.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre classique à date, au cadran sobre."
    })
);

const iwc = new Marque("IWC", "Suisse");
iwc.ajouter(
    new Montre("Portugieser Chronograph", 0, 41, "../img/iwc/portugieser-chronograph.webp", "Chronographe automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Un chronographe élégant au cadran épuré, avec chiffres arabes et compteurs lisibles."
    }),
    new Montre("Pilot's Watch Mark XX", 0, 40, "../img/iwc/pilot-s-watch-mark-xx.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2022,
        description: "Une montre d'aviateur moderne, lisible et compacte."
    }),
    new Montre("Portofino Automatic 40", 0, 40, "../img/iwc/portofino-automatic-40.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre habillée aux lignes simples, avec petite seconde ou date selon les versions."
    }),
    new Montre("Ingenieur Automatic 40", 0, 40, "../img/iwc/ingenieur-automatic-40.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2023,
        description: "Une montre sportive-chic au bracelet intégré, inspirée du design de Gérald Genta."
    })
);

const breitling = new Marque("Breitling", "Suisse");
breitling.ajouter(
    new Montre("Navitimer B01 Chronograph 43", 0, 43, "../img/breitling/navitimer-b01-chronograph-43.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Le chronographe d'aviateur à règle à calcul circulaire."
    }),
    new Montre("Chronomat B01 42", 0, 42, "../img/breitling/chronomat-b01-42.webp", "Chronographe automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Un chronographe sportif à lunette crantée, étanche à 200 m."
    }),
    new Montre("Superocean Automatic 42", 0, 42, "../img/breitling/superocean-automatic-42.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée robuste, étanche à 300 m."
    }),
    new Montre("Avenger Automatic 42", 0, 42, "../img/breitling/avenger-automatic-42.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une montre sportive inspirée de l'aviation, étanche à 300 m."
    })
);

const tudor = new Marque("Tudor", "Suisse");
tudor.ajouter(
    new Montre("Black Bay 41", 0, 41, "../img/tudor/black-bay-41.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée au look vintage, étanche à 200 m."
    }),
    new Montre("Black Bay Fifty-Eight", 0, 39, "../img/tudor/black-bay-fifty-eight.webp", "Automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable", annee: 2018,
        description: "Une plongeuse compacte de 39 mm, inspirée d'un modèle de 1958."
    }),
    new Montre("Pelagos 39", 0, 39, "../img/tudor/pelagos-39.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Titane", annee: 2022,
        description: "Une montre de plongée en titane, légère et robuste."
    }),
    new Montre("1926 39", 0, 39, "../img/tudor/1926-39.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2020,
        description: "Une montre classique et simple, inspirée de la première Oyster de Tudor."
    }),
    new Montre("Royal 41", 0, 41, "../img/tudor/royal-41.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2020,
        description: "Une montre à bracelet intégré, entre sport et élégance."
    })
);

const hublot = new Marque("Hublot", "Suisse");
hublot.ajouter(
    new Montre("Big Bang Unico", 0, 42, "../img/hublot/big-bang-unico.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Titane",
        description: "Le chronographe emblématique de Hublot, avec lunette à six vis."
    }),
    new Montre("Classic Fusion", 0, 42, "../img/hublot/classic-fusion.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "5 bar (50 m)", boitier: "Titane",
        description: "Une montre plus classique de la maison, au boîtier sobre."
    }),
    new Montre("Spirit of Big Bang", 0, 42, "../img/hublot/spirit-of-big-bang.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Titane",
        description: "Un boîtier tonneau original, dans l'esprit de la Big Bang."
    }),
    new Montre("Square Bang Unico", 0, 42, "../img/hublot/square-bang-unico.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], boitier: "Titane",
        description: "Une Big Bang au boîtier carré, avec mouvement chronographe Unico."
    })
);

const panerai = new Marque("Panerai", "Italie");
panerai.ajouter(
    new Montre("Luminor Marina", 0, 44, "../img/panerai/luminor-marina.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "La montre emblématique de Panerai, avec son protège-couronne caractéristique."
    }),
    new Montre("Radiomir", 0, 45, "../img/panerai/radiomir.webp", "Remontage manuel", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre au boîtier coussin et aux larges anses fil de fer."
    }),
    new Montre("Submersible", 0, 44, "../img/panerai/submersible.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée à lunette tournante, étanche à 300 m."
    }),
    new Montre("Luminor Due", 0, 42, "../img/panerai/luminor-due.webp", "Automatique", false, {
        usages: ["habille"], boitier: "Acier inoxydable",
        description: "Une version plus fine et plus élégante de la Luminor."
    })
);

const zenith = new Marque("Zenith", "Suisse");
zenith.ajouter(
    new Montre("Chronomaster Sport", 0, 41, "../img/zenith/chronomaster-sport.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2021,
        description: "Un chronographe sportif à mouvement El Primero."
    }),
    new Montre("Defy Skyline", 0, 41, "../img/zenith/defy-skyline.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2022,
        description: "Une montre sportive à lunette facettée à 12 pans."
    }),
    new Montre("Pilot Automatic", 0, 40, "../img/zenith/pilot-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], boitier: "Acier inoxydable",
        description: "Une montre d'aviateur au cadran lisible et au look rétro."
    }),
    new Montre("Chronomaster Original", 0, 38, "../img/zenith/chronomaster-original.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], boitier: "Acier inoxydable", annee: 2021,
        description: "Le retour du chronographe El Primero de 1969, en 38 mm."
    })
);

const bulgari = new Marque("Bulgari", "Italie");
bulgari.ajouter(
    new Montre("Octo Finissimo", 0, 40, "../img/bulgari/octo-finissimo.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Titane",
        description: "Une montre extra-plate au boîtier octogonal ciselé."
    }),
    new Montre("Octo Roma", 0, 41, "../img/bulgari/octo-roma.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre au boîtier octogonal à la fois sportif et élégant."
    })
);

const chopard = new Marque("Chopard", "Suisse");
chopard.ajouter(
    new Montre("Alpine Eagle 41", 0, 41, "../img/chopard/alpine-eagle-41.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2019,
        description: "Une montre sportive-chic au cadran inspiré de l'iris d'un aigle."
    }),
    new Montre("Mille Miglia Classic Chronograph", 0, 42, "../img/chopard/mille-miglia-classic-chronograph.webp", "Chronographe automatique", false, {
        usages: ["sport", "quotidien"], boitier: "Acier inoxydable",
        description: "Un chronographe inspiré de la course automobile italienne."
    }),
    new Montre("L.U.C XPS", 0, 40, "../img/chopard/l-u-c-xps.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre fine et élégante, avec micro-rotor."
    })
);

const ulysse_nardin = new Marque("Ulysse Nardin", "Suisse");
ulysse_nardin.ajouter(
    new Montre("Diver 42", 0, 42, "../img/ulysse-nardin/diver-42.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée à lunette tournante, étanche à 200 m."
    }),
    new Montre("Marine Torpilleur", 0, 42, "../img/ulysse-nardin/marine-torpilleur.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre classique inspirée des chronomètres de marine."
    }),
    new Montre("Freak X", 0, 43, "../img/ulysse-nardin/freak-x.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], boitier: "Titane",
        description: "Une montre à mouvement visible sans aiguilles classiques, très originale."
    })
);

const girard_perregaux = new Marque("Girard-Perregaux", "Suisse");
girard_perregaux.ajouter(
    new Montre("Laureato 42", 0, 42, "../img/girard-perregaux/laureato-42.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre à bracelet intégré et lunette octogonale."
    }),
    new Montre("1966 40", 0, 40, "../img/girard-perregaux/1966-40.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre ronde et classique, aux lignes pures."
    })
);

const longines = new Marque("Longines", "Suisse");
longines.ajouter(
    new Montre("HydroConquest 41", 0, 41, "../img/longines/hydroconquest-41.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "La montre de plongée de Longines, étanche à 300 m."
    }),
    new Montre("Spirit", 0, 40, "../img/longines/spirit.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", annee: 2020,
        description: "Une montre d'aviateur moderne, inspirée des modèles historiques de la marque."
    }),
    new Montre("Master Collection", 0, 40, "../img/longines/master-collection.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre classique et élégante, au cadran sobre."
    }),
    new Montre("Conquest 41", 0, 41, "../img/longines/conquest-41.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], boitier: "Acier inoxydable",
        description: "Une montre sport-élégante pour tous les jours."
    })
);

const oris = new Marque("Oris", "Suisse");
oris.ajouter(
    new Montre("Aquis Date", 0, 41.5, "../img/oris/aquis-date.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée à lunette tournante, étanche à 300 m."
    }),
    new Montre("Big Crown Pointer Date", 0, 40, "../img/oris/big-crown-pointer-date.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre d'aviateur à grande couronne et indicateur de date à aiguille."
    }),
    new Montre("Divers Sixty-Five", 0, 38, "../img/oris/divers-sixty-five.webp", "Automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse de style vintage, compacte et confortable."
    }),
    new Montre("ProPilot X Calibre 400", 0, 41, "../img/oris/propilot-x-calibre-400.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Titane",
        description: "Une montre d'aviateur en titane, légère et antimagnétique."
    })
);

const grand_seiko = new Marque("Grand Seiko", "Japon");
grand_seiko.ajouter(
    new Montre("Heritage Snowflake SBGA211", 0, 41, "../img/grand-seiko/heritage-snowflake-sbga211.webp", "Spring Drive", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Titane", cadran: "Blanc",
        description: "Un cadran blanc texturé qui évoque la neige, avec mouvement Spring Drive."
    }),
    new Montre("Evolution 9 SLGH005", 0, 40, "../img/grand-seiko/evolution-9-slgh005.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable", cadran: "Blanc", annee: 2021,
        description: "Une montre au cadran blanc texturé « bouleau blanc » et au design affûté."
    })
);

const nomos = new Marque("Nomos", "Allemagne");
nomos.ajouter(
    new Montre("Tangente 38", 0, 38, "../img/nomos/tangente-38.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable", cadran: "Blanc",
        description: "Le grand classique du Bauhaus : cadran blanc épuré et aiguilles fines."
    }),
    new Montre("Metro 38", 0, 38, "../img/nomos/metro-38.webp", "Remontage manuel", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre fine à réserve de marche, dans le style de la Bauhaus."
    })
);

const rado = new Marque("Rado", "Suisse");
rado.ajouter(
    new Montre("Captain Cook Automatic", 0, 42, "../img/rado/captain-cook-automatic.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse au look rétro, étanche à 300 m."
    }),
    new Montre("True Thinline", 0, 39, "../img/rado/true-thinline.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre fine et minimaliste, au boîtier lisse."
    }),
    new Montre("DiaStar Original", 0, 38, "../img/rado/diastar-original.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une réédition de la première montre inrayable de Rado."
    })
);

const frederique_constant = new Marque("Frederique Constant", "Suisse");
frederique_constant.ajouter(
    new Montre("Classics Index Automatic", 0, 40, "../img/frederique-constant/classics-index-automatic.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre classique et abordable, à index appliqués."
    }),
    new Montre("Highlife Automatic", 0, 41, "../img/frederique-constant/highlife-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre à bracelet intégré et lunette cannelée."
    }),
    new Montre("Slimline Automatic", 0, 40, "../img/frederique-constant/slimline-automatic.webp", "Automatique", false, {
        usages: ["habille"], boitier: "Acier inoxydable",
        description: "Une montre fine et épurée, au mouvement automatique."
    })
);

const maurice_lacroix = new Marque("Maurice Lacroix", "Suisse");
maurice_lacroix.ajouter(
    new Montre("Aikon Automatic", 0, 42, "../img/maurice-lacroix/aikon-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable", annee: 2016,
        description: "Une montre sportive au bracelet intégré et à la lunette à six griffes."
    }),
    new Montre("Eliros Date", 0, 40, "../img/maurice-lacroix/eliros-date.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre classique et simple, avec affichage de la date."
    }),
    new Montre("Pontos S", 0, 43, "../img/maurice-lacroix/pontos-s.webp", "Automatique", false, {
        usages: ["sport"], boitier: "Acier inoxydable",
        description: "Une montre sportive de caractère, au boîtier de 43 mm."
    })
);

const baume_mercier = new Marque("Baume & Mercier", "Suisse");
baume_mercier.ajouter(
    new Montre("Riviera Automatic", 0, 42, "../img/baume-mercier/riviera-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre au boîtier à douze faces et au look sportif-chic."
    }),
    new Montre("Clifton Baumatic", 0, 40, "../img/baume-mercier/clifton-baumatic.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre classique à mouvement Baumatic, avec une grande réserve de marche."
    }),
    new Montre("Classima", 0, 40, "../img/baume-mercier/classima.webp", "Automatique", false, {
        usages: ["habille"], boitier: "Acier inoxydable",
        description: "Une montre ronde et sobre, pour toutes les occasions."
    })
);

const raymond_weil = new Marque("Raymond Weil", "Suisse");
raymond_weil.ajouter(
    new Montre("Freelancer Automatic", 0, 42, "../img/raymond-weil/freelancer-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre sport-élégante à fond transparent."
    }),
    new Montre("Maestro", 0, 40, "../img/raymond-weil/maestro.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre habillée classique, avec petite seconde ou date."
    }),
    new Montre("Toccata", 0, 39, "../img/raymond-weil/toccata.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre simple et élégante à quartz."
    }),
    new Montre("Tango", 0, 41, "../img/raymond-weil/tango.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre à quartz à cadran moderne, pour tous les jours."
    })
);

const mido = new Marque("Mido", "Suisse");
mido.ajouter(
    new Montre("Ocean Star 200C", 0, 42.5, "../img/mido/ocean-star-200c.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée à lunette tournante, étanche à 200 m."
    }),
    new Montre("Multifort M", 0, 42, "../img/mido/multifort-m.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre robuste et polyvalente, au design inspiré du passé de la marque."
    }),
    new Montre("Commander Gradient", 0, 40, "../img/mido/commander-gradient.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre élégante à cadran dégradé et fond transparent."
    }),
    new Montre("Baroncelli Signature", 0, 39, "../img/mido/baroncelli-signature.webp", "Automatique", false, {
        usages: ["habille"], boitier: "Acier inoxydable",
        description: "Une montre habillée aux lignes classiques."
    })
);

const certina = new Marque("Certina", "Suisse");
certina.ajouter(
    new Montre("DS Action Diver", 0, 43, "../img/certina/ds-action-diver.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée robuste, étanche à 300 m."
    }),
    new Montre("DS-1", 0, 40, "../img/certina/ds-1.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre classique et simple, dans l'esprit des années 60."
    }),
    new Montre("DS PH200M", 0, 43, "../img/certina/ds-ph200m.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse inspirée d'un modèle historique de la marque, étanche à 200 m."
    })
);

const seiko = new Marque("Seiko", "Japon");
seiko.ajouter(
    new Montre("Presage Cocktail Time", 0, 40.5, "../img/seiko/presage-cocktail-time.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable",
        description: "Une montre habillée au cadran dégradé inspiré des cocktails."
    }),
    new Montre("Prospex Turtle", 0, 45, "../img/seiko/prospex-turtle.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse au boîtier coussin, étanche à 200 m."
    }),
    new Montre("5 Sports SRPD", 0, 42.5, "../img/seiko/5-sports-srpd.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre sportive et abordable, pour tous les jours."
    })
);

const citizen = new Marque("Citizen", "Japon");
citizen.ajouter(
    new Montre("Tsuyosa", 0, 40, "../img/citizen/tsuyosa.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", annee: 2022,
        description: "Une montre automatique colorée au bracelet intégré."
    }),
    new Montre("Promaster Diver", 0, 42, "../img/citizen/promaster-diver.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée robuste, étanche à 200 m."
    }),
    new Montre("Series 8 870", 0, 41, "../img/citizen/series-8-870.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "10 bar (100 m)", boitier: "Acier inoxydable",
        description: "Une montre automatique moderne au boîtier à facettes."
    })
);

const orient = new Marque("Orient", "Japon");
orient.ajouter(
    new Montre("Bambino Version 5", 0, 40.5, "../img/orient/bambino-version-5.webp", "Automatique", false, {
        usages: ["habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre habillée au verre bombé, à prix très accessible."
    }),
    new Montre("Kamasu", 0, 41.8, "../img/orient/kamasu.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse abordable, étanche à 200 m."
    }),
    new Montre("Mako", 0, 41.5, "../img/orient/mako.webp", "Automatique", false, {
        usages: ["sport", "quotidien"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse polyvalente, étanche à 200 m."
    })
);

const casio = new Marque("Casio", "Japon");
casio.ajouter(
    new Montre("G-Shock DW-5600E", 0, 48.9, "../img/casio/g-shock-dw-5600e.webp", "Quartz", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Résine", cadran: "Noir",
        description: "La G-Shock carrée d'origine (42,8 × 48,9 mm), très résistante aux chocs."
    }),
    new Montre("G-Shock GA-2100", 0, 45.4, "../img/casio/g-shock-ga-2100.webp", "Quartz", false, {
        usages: ["sport", "quotidien"], etancheite: "20 bar (200 m)", boitier: "Résine", annee: 2019,
        description: "La « CasiOak » : une G-Shock fine au boîtier octogonal."
    }),
    new Montre("Vintage F-91W", 0, 38.2, "../img/casio/vintage-f-91w.webp", "Quartz", false, {
        usages: ["quotidien"], etancheite: "3 bar (30 m)", boitier: "Résine", cadran: "Noir",
        description: "La montre digitale légendaire, simple et très abordable."
    })
);

const bulova = new Marque("Bulova", "États-Unis");
bulova.ajouter(
    new Montre("Lunar Pilot", 0, 45, "../img/bulova/lunar-pilot.webp", "Quartz chronographe", false, {
        usages: ["sport", "quotidien"], boitier: "Acier inoxydable",
        description: "Le chronographe inspiré de la montre portée sur la Lune en 1971."
    }),
    new Montre("Marine Star", 0, 45, "../img/bulova/marine-star.webp", "Quartz chronographe", false, {
        usages: ["sport"], boitier: "Acier inoxydable",
        description: "Un chronographe sportif d'inspiration marine."
    })
);

const timex = new Marque("Timex", "États-Unis");
timex.ajouter(
    new Montre("Marlin Automatic", 0, 40, "../img/timex/marlin-automatic.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre automatique au look rétro, à prix accessible."
    }),
    new Montre("Q Timex", 0, 38, "../img/timex/q-timex.webp", "Quartz", false, {
        usages: ["quotidien", "habille"], etancheite: "5 bar (50 m)", boitier: "Acier inoxydable", annee: 2019,
        description: "Une réédition d'une montre à quartz de 1979."
    }),
    new Montre("Weekender", 0, 38, "../img/timex/weekender.webp", "Quartz", false, {
        usages: ["quotidien"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre simple et colorée pour tous les jours."
    }),
    new Montre("Expedition Scout", 0, 40, "../img/timex/expedition-scout.webp", "Quartz", false, {
        usages: ["quotidien"], etancheite: "5 bar (50 m)",
        description: "Une montre robuste d'inspiration militaire."
    })
);

const swatch = new Marque("Swatch", "Suisse");
swatch.ajouter(
    new Montre("MoonSwatch Mission to the Moon", 0, 42, "../img/swatch/moonswatch-mission-to-the-moon.webp", "Quartz chronographe", false, {
        usages: ["quotidien"], etancheite: "3 bar (30 m)", boitier: "Biocéramique", cadran: "Noir", annee: 2022,
        description: "La collaboration avec Omega : un chronographe coloré inspiré de la Speedmaster."
    }),
    new Montre("Scuba Fifty Fathoms", 0, 42.3, "../img/swatch/scuba-fifty-fathoms.webp", "Quartz", false, {
        usages: ["quotidien", "sport"], boitier: "Biocéramique",
        description: "Une montre de plongée colorée inspirée de la Fifty Fathoms de Blancpain."
    }),
    new Montre("Sistem51 Irony", 0, 42, "../img/swatch/sistem51-irony.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], etancheite: "3 bar (30 m)", boitier: "Acier inoxydable",
        description: "Une montre automatique fabriquée en série, avec un mouvement en 51 pièces."
    })
);

const christopher_ward = new Marque("Christopher Ward", "Royaume-Uni");
christopher_ward.ajouter(
    new Montre("C60 Trident Pro 300", 0, 40, "../img/christopher-ward/c60-trident-pro-300.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "30 bar (300 m)", boitier: "Acier inoxydable",
        description: "Une montre de plongée robuste, étanche à 300 m."
    }),
    new Montre("C63 Sealander", 0, 40, "../img/christopher-ward/c63-sealander.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], boitier: "Acier inoxydable",
        description: "Une montre d'aventure polyvalente."
    }),
    new Montre("The Twelve", 0, 36, "../img/christopher-ward/the-twelve.webp", "Automatique", false, {
        usages: ["quotidien", "habille"], boitier: "Acier inoxydable",
        description: "Une montre à bracelet intégré, compacte et élégante."
    })
);

const baltic = new Marque("Baltic", "France");
baltic.ajouter(
    new Montre("Aquascaphe", 0, 39, "../img/baltic/aquascaphe.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse de 39 mm, étanche à 200 m, à prix de microbrand."
    })
);

const yema = new Marque("Yema", "France");
yema.ajouter(
    new Montre("Superman", 0, 41, "../img/yema/superman.webp", "Automatique", false, {
        usages: ["sport"], boitier: "Acier inoxydable",
        description: "Une montre de plongée au look rétro, héritière d'un modèle des années 60."
    })
);

const lorier = new Marque("Lorier", "États-Unis");
lorier.ajouter(
    new Montre("Neptune", 0, 39, "../img/lorier/neptune.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse vintage de 39 mm, étanche à 200 m."
    })
);

const vostok = new Marque("Vostok", "Russie");
vostok.ajouter(
    new Montre("Amphibia", 0, 40, "../img/vostok/amphibia.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse russe culte, très abordable et étanche à 200 m."
    }),
    new Montre("Komandirskie", 0, 39, "../img/vostok/komandirskie.webp", "Automatique", false, {
        usages: ["quotidien", "sport"], boitier: "Acier inoxydable",
        description: "Une montre d'inspiration militaire à prix très accessible."
    })
);

const invicta = new Marque("Invicta", "États-Unis");
invicta.ajouter(
    new Montre("Pro Diver", 0, 40, "../img/invicta/pro-diver.webp", "Automatique", false, {
        usages: ["sport"], etancheite: "20 bar (200 m)", boitier: "Acier inoxydable",
        description: "Une plongeuse abordable inspirée des classiques du genre."
    })
);

const marques = [tissot, rolex, patek, audemars_piguet, vacheron_constantin, a_lange_sohne, breguet, blancpain, hamilton, omega, cartier, jaeger_lecoultre, iwc, breitling, tudor, hublot, panerai, zenith, bulgari, chopard, ulysse_nardin, girard_perregaux, longines, oris, grand_seiko, nomos, rado, frederique_constant, maurice_lacroix, baume_mercier, raymond_weil, mido, certina, seiko, citizen, orient, casio, bulova, timex, swatch, christopher_ward, baltic, yema, lorier, vostok, invicta]; // ajoute ici chaque nouvelle marque
const toutesLesMontres = marques.flatMap(marque => marque.montres);

/* ===== Stockage dans le navigateur ===== */

const CLE_SOUHAITS = "chronoid-souhaits";
const CLE_COMPARER = "chronoid-comparer";
const CLE_THEME = "chronoid-theme";
const MAX_COMPARER = 3;

function lireListe(cle) {
    try {
        const liste = JSON.parse(localStorage.getItem(cle));
        return Array.isArray(liste) ? liste : [];
    } catch (erreur) {
        return [];
    }
}

function ecrireListe(cle, liste) {
    try {
        localStorage.setItem(cle, JSON.stringify(liste));
    } catch (erreur) {
        // stockage indisponible : on ignore
    }
}

function lireObjet(cle) {
    try {
        const objet = JSON.parse(localStorage.getItem(cle));
        return objet && typeof objet === "object" && !Array.isArray(objet) ? objet : null;
    } catch (erreur) {
        return null;
    }
}

function ecrireObjet(cle, objet) {
    try {
        localStorage.setItem(cle, JSON.stringify(objet));
    } catch (erreur) {
        // stockage indisponible : on ignore
    }
}

function effacer(cle) {
    try {
        localStorage.removeItem(cle);
    } catch (erreur) {
        // ignoré
    }
}

const lireSouhaits = () => lireListe(CLE_SOUHAITS);
const ecrireSouhaits = ids => ecrireListe(CLE_SOUHAITS, ids);
const lireComparer = () => lireListe(CLE_COMPARER);
const ecrireComparer = ids => ecrireListe(CLE_COMPARER, ids);

function basculerSouhait(montre) {
    const ids = lireSouhaits();
    const nouveaux = ids.includes(montre.id)
        ? ids.filter(id => id !== montre.id)
        : [...ids, montre.id];
    ecrireSouhaits(nouveaux);
    majCompteurCoeurs();
}

// Renvoie false si on a déjà atteint le maximum de montres à comparer
function basculerComparer(montre) {
    const ids = lireComparer();
    if (ids.includes(montre.id)) {
        ecrireComparer(ids.filter(id => id !== montre.id));
        return true;
    }
    if (ids.length >= MAX_COMPARER) return false;
    ecrireComparer([...ids, montre.id]);
    return true;
}

/* ===== Éléments réutilisables ===== */

function formaterPrix(prix) {
    return prix > 0 ? `${prix.toLocaleString("fr-CH")} chf` : "Prix sur demande";
}

function pluriel(nombre, mot) {
    return `${nombre} ${mot}${nombre > 1 ? "s" : ""}`;
}

function valeur(v, suffixe = "") {
    return v === null || v === undefined || v === "" ? "—" : `${v}${suffixe}`;
}

function lignesSpecs(montre) {
    return [
        ["Marque", montre.marque.nom],
        ["Prix", formaterPrix(montre.prix)],
        ["Diamètre", `${montre.diametre} mm`],
        ["Mouvement", montre.mouvement],
        ["Étanchéité", valeur(montre.etancheite)],
        ["Boîtier", valeur(montre.boitier)],
        ["Cadran", valeur(montre.cadran)],
        ["Année", valeur(montre.annee)]
    ];
}

function trouverMontres(ids) {
    return ids.map(id => toutesLesMontres.find(m => m.id === id)).filter(Boolean);
}

function creerCoeur(montre, apres) {
    const coeur = document.createElement("button");
    coeur.type = "button";
    coeur.className = "coeur";
    majCoeur(coeur, montre);
    coeur.addEventListener("click", () => {
        basculerSouhait(montre);
        majCoeur(coeur, montre);
        if (apres) apres();
    });
    return coeur;
}

function majCoeur(bouton, montre) {
    const actif = lireSouhaits().includes(montre.id);
    bouton.textContent = actif ? "♥" : "♡";
    bouton.setAttribute("aria-pressed", actif);
    bouton.setAttribute("aria-label",
        actif ? `Retirer ${montre.nom} de la liste de souhaits`
              : `Ajouter ${montre.nom} à la liste de souhaits`);
}

function creerCaseComparer(montre) {
    const label = document.createElement("label");
    label.className = "comparer";

    const caseCochee = document.createElement("input");
    caseCochee.type = "checkbox";
    caseCochee.checked = lireComparer().includes(montre.id);
    caseCochee.addEventListener("change", () => {
        const ok = basculerComparer(montre);
        if (!ok) {
            caseCochee.checked = false;
            majBarre(`Vous pouvez comparer ${MAX_COMPARER} montres au maximum.`);
            return;
        }
        majBarre();
    });

    label.append(caseCochee, " Comparer");
    return label;
}

function creerCarte(montre) {
    const carte = document.createElement("div");
    carte.className = "montre";
    const lien = `montre.html?id=${encodeURIComponent(montre.id)}`;

    const img = document.createElement("img");
    img.src = montre.image;
    img.alt = `${montre.marque.nom} ${montre.nom}`;

    const lienImage = document.createElement("a");
    lienImage.href = lien;
    lienImage.className = "lien-img";
    lienImage.tabIndex = -1;
    lienImage.append(img);

    const infos = document.createElement("div");
    infos.className = "infos";
    infos.innerHTML = `<h3><a href="${lien}">${montre.nom}</a></h3>
        <p class="prix">${formaterPrix(montre.prix)}</p>
        <p class="details">${montre.diametre} mm, ${montre.mouvement}</p>`;

    const coeur = creerCoeur(montre, () => {
        if (zoneSouhaits) afficherSouhaits(); // la montre disparaît de la liste
    });

    carte.append(coeur, lienImage, infos, creerCaseComparer(montre));
    return carte;
}

/* ===== Thème (clair / sombre) ===== */

function themeInitial() {
    try {
        const enregistre = localStorage.getItem(CLE_THEME);
        if (enregistre === "dark" || enregistre === "light") return enregistre;
    } catch (erreur) { /* on suit l'appareil */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function appliquerTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (boutonTheme) {
        boutonTheme.textContent = theme === "dark" ? "☀" : "☾";
        boutonTheme.setAttribute("aria-label",
            theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre");
    }
}

appliquerTheme(themeInitial());

if (boutonTheme) {
    boutonTheme.addEventListener("click", () => {
        const nouveau = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        appliquerTheme(nouveau);
        try {
            localStorage.setItem(CLE_THEME, nouveau);
        } catch (erreur) { /* ignoré */ }
    });
}

/* ===== Image de secours (photo manquante) ===== */

const IMAGE_SECOURS = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">'
    + '<rect width="300" height="300" fill="#d5dad7"/>'
    + '<circle cx="150" cy="130" r="52" fill="none" stroke="#5d6a66" stroke-width="6"/>'
    + '<path d="M150 100v30l20 14M128 70l8 26M172 70l-8 26M128 190l8-26M172 190l-8-26" fill="none" stroke="#5d6a66" stroke-width="6" stroke-linecap="round"/>'
    + '<text x="150" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#5d6a66">Photo à venir</text>'
    + '</svg>');

document.addEventListener("error", evenement => {
    const img = evenement.target;
    if (!(img instanceof HTMLImageElement) || img.dataset.secours || img.closest("header")) return;
    img.dataset.secours = "1";
    img.src = IMAGE_SECOURS;
}, true);

/* ===== Menu burger ===== */

if (boutonBurger && menu) {
    boutonBurger.addEventListener("click", () => {
        const ouvert = menu.classList.toggle("ouvert");
        boutonBurger.setAttribute("aria-expanded", ouvert);
        boutonBurger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    });
}

/* ===== Compteur de cœurs (menu) ===== */

function majCompteurCoeurs() {
    const nombre = lireSouhaits().length;
    document.querySelectorAll(".badge").forEach(badge => {
        badge.textContent = nombre;
        badge.dataset.vide = nombre === 0;
        badge.setAttribute("aria-label", pluriel(nombre, "montre") + " dans la liste de souhaits");
    });
}

majCompteurCoeurs();

/* ===== Retour en haut ===== */

const boutonHaut = document.createElement("button");
boutonHaut.type = "button";
boutonHaut.id = "haut";
boutonHaut.textContent = "↑";
boutonHaut.hidden = true;
boutonHaut.setAttribute("aria-label", "Retour en haut de la page");
document.body.append(boutonHaut);

window.addEventListener("scroll", () => {
    boutonHaut.hidden = window.scrollY < 400;
}, { passive: true });

boutonHaut.addEventListener("click", () => {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduit ? "auto" : "smooth" });
});

/* ===== Barre de comparaison (en bas de page) ===== */

let barre = null;
let texteBarre = null;
let lienBarre = null;
let minuteurMessage = null;

function creerBarre() {
    barre = document.createElement("div");
    barre.id = "barre-comparer";
    barre.hidden = true;
    barre.setAttribute("role", "status");

    texteBarre = document.createElement("span");

    lienBarre = document.createElement("a");
    lienBarre.href = "comparer.html";
    lienBarre.className = "btn";
    lienBarre.textContent = "Comparer";

    const vider = document.createElement("button");
    vider.type = "button";
    vider.className = "btn-sec";
    vider.textContent = "Vider";
    vider.addEventListener("click", () => {
        ecrireComparer([]);
        document.querySelectorAll(".comparer input").forEach(c => { c.checked = false; });
        majBarre();
    });

    barre.append(texteBarre, lienBarre, vider);
    document.body.append(barre);
}

function majBarre(message) {
    if (zoneComparaison) return; // la page de comparaison a sa propre interface
    if (!barre) creerBarre();

    const nombre = lireComparer().length;
    barre.hidden = nombre === 0;
    lienBarre.hidden = nombre < 2;
    texteBarre.textContent = message
        || (nombre < 2 ? "Choisissez au moins 2 montres à comparer."
                       : `${pluriel(nombre, "montre")} à comparer`);

    if (message) {
        clearTimeout(minuteurMessage);
        minuteurMessage = setTimeout(() => majBarre(), 2500);
    }
}

majBarre();

/* ===== Accueil : carrousel ===== */

if (montrePop) {
    const populaires = toutesLesMontres.filter(montre => montre.populaire);
    const aAfficher = populaires.length > 0 ? populaires : toutesLesMontres;
    let position = 0;
    let minuteur = null;
    let enPause = false;

    const afficher = () => {
        const montre = aAfficher[position];
        montrePop.src = montre.image;
        montrePop.alt = `${montre.marque.nom} ${montre.nom}`;
        legende.textContent = `Montre populaire : ${montre.marque.nom} ${montre.nom}`;
    };

    const arreter = () => clearInterval(minuteur);
    const demarrer = () => {
        arreter();
        if (!enPause) minuteur = setInterval(() => aller(1), 2500);
    };

    const aller = (sens) => {
        position = (position + sens + aAfficher.length) % aAfficher.length;
        afficher();
    };

    const boutonPrec = document.querySelector("#prec");
    const boutonSuiv = document.querySelector("#suiv");
    const boutonPause = document.querySelector("#pause");

    if (boutonPrec) boutonPrec.addEventListener("click", () => { aller(-1); demarrer(); });
    if (boutonSuiv) boutonSuiv.addEventListener("click", () => { aller(1); demarrer(); });
    if (boutonPause) {
        boutonPause.addEventListener("click", () => {
            enPause = !enPause;
            boutonPause.textContent = enPause ? "▶" : "⏸";
            boutonPause.setAttribute("aria-label", enPause ? "Reprendre le défilement" : "Mettre en pause");
            demarrer();
        });
    }

    afficher();
    demarrer();
}

if (statsSite) {
    statsSite.textContent =
        `Pour l'instant : ${pluriel(marques.length, "marque")} et ${pluriel(toutesLesMontres.length, "montre")} à découvrir.`;
}

/* ===== Accueil : marques à la une ===== */

if (zoneUne) {
    const avecMontres = marques.filter(marque => marque.montres.length > 0);
    const aLaUne = avecMontres.length > 0 ? avecMontres : marques;

    aLaUne.forEach(marque => {
        const lien = document.createElement("a");
        lien.className = "bloc";
        lien.href = `liste-montre.html?marque=${encodeURIComponent(marque.nom.toLowerCase())}`;

        const titre = document.createElement("h3");
        titre.textContent = marque.nom;

        const infos = document.createElement("p");
        infos.textContent = `${marque.pays} · ${pluriel(marque.montres.length, "montre")}`;

        lien.append(titre, infos);
        zoneUne.append(lien);
    });
}

/* ===== Liste de montres : logos de marques cliquables ===== */

let marqueOuverte = null;

if (zoneMarques && listeMontre) {
    const boutons = marques.map(marque => {
        const bouton = creerBoutonMarque(marque);
        zoneMarques.appendChild(bouton);
        return bouton;
    });
    afficherConsigne();

    // ?marque=tissot ouvre directement la marque (lien depuis l'accueil)
    const voulue = new URLSearchParams(location.search).get("marque");
    const index = marques.findIndex(marque => marque.nom.toLowerCase() === voulue);
    if (index >= 0) ouvrirMarque(marques[index], boutons[index]);
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

    if (marque.montres.length === 0) {
        const aucune = document.createElement("p");
        aucune.className = "vide";
        aucune.textContent = `Aucune montre ${marque.nom} pour l'instant.`;
        listeMontre.replaceChildren(titre, aucune);
        return;
    }

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

if (boutonVider) {
    boutonVider.addEventListener("click", () => {
        ecrireSouhaits([]);
        majCompteurCoeurs();
        afficherSouhaits();
    });
}

function afficherSouhaits() {
    const ids = lireSouhaits();
    const souhaits = toutesLesMontres.filter(montre => ids.includes(montre.id));
    zoneSouhaits.replaceChildren(...souhaits.map(creerCarte));
    messageVide.hidden = souhaits.length > 0;

    if (resume) {
        resume.hidden = souhaits.length === 0;
        const somme = souhaits.reduce((total, montre) => total + montre.prix, 0);
        const sansPrix = souhaits.some(montre => montre.prix <= 0);
        totalSouhaits.textContent =
            `Total : ${somme.toLocaleString("fr-CH")} chf (${pluriel(souhaits.length, "montre")})`
            + (sansPrix ? ", hors prix sur demande" : "");
    }
}

/* ===== Page de détail ===== */

if (zoneDetail) {
    afficherDetail();
}

function afficherDetail() {
    const id = new URLSearchParams(location.search).get("id");
    const montre = toutesLesMontres.find(m => m.id === id);

    if (!montre) {
        const message = document.createElement("p");
        message.className = "vide";
        message.append("Cette montre n'existe pas. ");
        const retour = document.createElement("a");
        retour.href = "liste-montre.html";
        retour.textContent = "Retour à la liste de montres";
        message.append(retour);
        zoneDetail.replaceChildren(message);
        return;
    }

    document.title = `${montre.marque.nom} ${montre.nom} | ChronoID`;

    const img = document.createElement("img");
    img.src = montre.image;
    img.alt = `${montre.marque.nom} ${montre.nom}`;

    const texte = document.createElement("div");

    const nomMarque = document.createElement("p");
    nomMarque.className = "marque-nom";
    nomMarque.textContent = montre.marque.nom;

    const titre = document.createElement("h2");
    titre.textContent = montre.nom;

    const prix = document.createElement("p");
    prix.className = "prix";
    prix.textContent = formaterPrix(montre.prix);

    texte.append(nomMarque, titre, prix);

    if (montre.description) {
        const description = document.createElement("p");
        description.className = "description";
        description.textContent = montre.description;
        texte.append(description);
    }

    const specs = document.createElement("dl");
    specs.className = "specs";
    lignesSpecs(montre).slice(2).forEach(([label, val]) => {
        const dt = document.createElement("dt");
        dt.textContent = label;
        const dd = document.createElement("dd");
        dd.textContent = val;
        specs.append(dt, dd);
    });

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(creerCoeur(montre), creerCaseComparer(montre));

    texte.append(specs, actions);
    zoneDetail.replaceChildren(img, texte);
}

/* ===== Page de comparaison ===== */

if (zoneComparaison) {
    afficherComparaison();
}

function afficherComparaison() {
    const montres = trouverMontres(lireComparer());
    messageVideComparer.hidden = montres.length > 0;

    if (montres.length === 0) {
        zoneComparaison.replaceChildren();
        return;
    }

    const table = document.createElement("table");
    const corps = document.createElement("tbody");

    const ligne = (label, remplir) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.scope = "row";
        th.textContent = label;
        tr.append(th);
        montres.forEach(montre => {
            const td = document.createElement("td");
            remplir(td, montre);
            tr.append(td);
        });
        corps.append(tr);
    };

    ligne("Photo", (td, montre) => {
        const img = document.createElement("img");
        img.src = montre.image;
        img.alt = `${montre.marque.nom} ${montre.nom}`;
        td.append(img);
    });

    ligne("Modèle", (td, montre) => {
        td.className = "nom-col";
        const lien = document.createElement("a");
        lien.href = `montre.html?id=${encodeURIComponent(montre.id)}`;
        lien.textContent = montre.nom;
        td.append(lien);
    });

    lignesSpecs(montres[0]).forEach(([label], i) => {
        ligne(label, (td, montre) => { td.textContent = lignesSpecs(montre)[i][1]; });
    });

    ligne("", (td, montre) => {
        const retirer = document.createElement("button");
        retirer.type = "button";
        retirer.className = "retirer";
        retirer.textContent = "Retirer";
        retirer.setAttribute("aria-label", `Retirer ${montre.nom} de la comparaison`);
        retirer.addEventListener("click", () => {
            ecrireComparer(lireComparer().filter(autre => autre !== montre.id));
            afficherComparaison();
        });
        td.append(retirer);
    });

    table.append(corps);
    zoneComparaison.replaceChildren(table);
}

/* ===== Chercheur de montres : quiz ===== */

// Clé Web3Forms (https://web3forms.com) : colle ta clé entre les guillemets pour recevoir les avis par e-mail.
// Si elle est vide, les avis restent seulement dans le navigateur du visiteur.
const CLE_WEB3FORMS = "1080e854-f332-495e-88af-79ae47c6f922";

const CLE_QUIZ = "chronoid-quiz";
const CLE_AVIS = "chronoid-avis";
const TOLERANCE_BUDGET = 1.1; // une montre jusqu'à 10 % au-dessus du budget reste proposée
const PEU_IMPORTE = { valeur: null, titre: "Peu importe" };
const ORDRE_POIGNETS = ["fin", "moyen", "large"];

const LIBELLES = {
    poignet: { fin: "poignet fin", moyen: "poignet moyen", large: "poignet large" },
    usage: { quotidien: "tous les jours", sport: "sport", habille: "tenue habillée" },
    mouvement: { quartz: "quartz", automatique: "automatique" },
    etancheite: { "3": "résiste aux éclaboussures", "5": "baignade et natation" }
};

function valeursUniques(champ) {
    return [...new Set(toutesLesMontres.map(montre => montre[champ]).filter(Boolean))];
}

function familleBoitier(boitier) {
    if (!boitier) return null;
    const m = boitier.toLowerCase();
    if (m.includes("titane")) return "Titane";
    if (m.includes("carbone")) return "Carbone";
    if (m.includes("résine") || m.includes("céramique")) return "Résine ou céramique";
    if (m.includes("pvd")) return "Acier traité PVD";
    if (m.startsWith("acier et or")) return "Acier et or";
    if (m.startsWith("or") || m.includes("platine")) return "Or ou platine";
    return "Acier";
}

function categoriePoignet(diametre) {
    if (diametre <= 39) return "fin";
    return diametre <= 41.5 ? "moyen" : "large";
}

function estAutomatique(montre) {
    return montre.mouvement.toLowerCase().includes("automatique");
}

function barsEtancheite(montre) {
    const trouve = /(\d+)\s*bar/i.exec(montre.etancheite || "");
    return trouve ? Number(trouve[1]) : 0;
}

function plafondBudget() {
    const plusChere = Math.max(0, ...toutesLesMontres.map(montre => montre.prix));
    return Math.max(100, Math.ceil(plusChere / 100) * 100);
}

function reponsesParDefaut() {
    return {
        budget: Math.min(500, plafondBudget()), sansLimite: false,
        poignet: null, usage: null, mouvement: null, cadran: null, boitier: null, etancheite: null
    };
}

function creerEtapes() {
    return [
        { cle: "budget", question: "Quel est ton budget ?" },
        { cle: "poignet", question: "Quelle est la taille de ton poignet ?", options: [
            { valeur: "fin", titre: "Fin", aide: "Montres de 39 mm et moins" },
            { valeur: "moyen", titre: "Moyen", aide: "Montres de 40 à 41 mm" },
            { valeur: "large", titre: "Large", aide: "Montres de 42 mm et plus" }
        ] },
        { cle: "usage", question: "Pour quel usage ?", options: [
            { valeur: "quotidien", titre: "Tous les jours" },
            { valeur: "sport", titre: "Sport" },
            { valeur: "habille", titre: "Tenue habillée" }
        ] },
        { cle: "mouvement", question: "Quel type de mouvement ?", options: [
            { valeur: "quartz", titre: "Quartz", aide: "Simple et précis, fonctionne avec une pile" },
            { valeur: "automatique", titre: "Automatique", aide: "Mécanique, se remonte avec le mouvement du poignet" }
        ] },
        { cle: "cadran", question: "Quelle couleur de cadran ?",
          options: valeursUniques("cadran").map(valeur => ({ valeur, titre: valeur })) },
        { cle: "boitier", question: "Quelle matière pour le boîtier ?",
          options: [...new Set(toutesLesMontres.map(m => familleBoitier(m.boitier)).filter(Boolean))]
              .map(valeur => ({ valeur, titre: valeur })) },
        { cle: "etancheite", question: "Quelle étanchéité te faut-il ?", options: [
            { valeur: "3", titre: "Pluie et éclaboussures", aide: "3 bar (30 m) ou plus" },
            { valeur: "5", titre: "Baignade et natation", aide: "5 bar (50 m) ou plus" }
        ] }
    ];
}

/* ----- Calcul des résultats ----- */

// Renvoie null si la montre est écartée (trop chère), sinon son score et ses critères
function evaluer(montre, rep) {
    const criteres = [];
    const ajouter = (poids, score, texte) => criteres.push({ poids, score, texte });

    if (!rep.sansLimite) {
        // prix inconnu (« Prix sur demande ») : on ne peut pas le comparer à un budget
        if (montre.prix <= 0 || montre.prix > rep.budget * TOLERANCE_BUDGET) return null;
        if (montre.prix <= rep.budget) {
            ajouter(3, 1, "Dans ton budget");
        } else {
            const ecart = Math.round((montre.prix / rep.budget - 1) * 100);
            ajouter(3, 0.5, `Un peu au-dessus de ton budget (+${ecart} %)`);
        }
    }

    if (rep.poignet) {
        const ecart = Math.abs(ORDRE_POIGNETS.indexOf(categoriePoignet(montre.diametre)) - ORDRE_POIGNETS.indexOf(rep.poignet));
        if (ecart === 0) ajouter(2, 1, `${montre.diametre} mm : la bonne taille`);
        else if (ecart === 1) ajouter(2, 0.5, `${montre.diametre} mm : proche de la taille voulue`);
        else ajouter(2, 0, `${montre.diametre} mm : pas la bonne taille`);
    }

    if (rep.usage) {
        const ok = montre.usages.includes(rep.usage);
        ajouter(2, ok ? 1 : 0, ok ? `Adaptée à l'usage « ${LIBELLES.usage[rep.usage]} »` : `Pas pensée pour l'usage « ${LIBELLES.usage[rep.usage]} »`);
    }

    if (rep.mouvement) {
        const ok = (rep.mouvement === "automatique") === estAutomatique(montre);
        ajouter(2, ok ? 1 : 0, ok ? `Mouvement ${LIBELLES.mouvement[rep.mouvement]}` : `Mouvement ${montre.mouvement.toLowerCase()}, pas ${LIBELLES.mouvement[rep.mouvement]}`);
    }

    if (rep.cadran) {
        const ok = montre.cadran === rep.cadran;
        ajouter(1.5, ok ? 1 : 0, ok ? `Cadran ${rep.cadran.toLowerCase()}` : `Cadran ${valeur(montre.cadran).toLowerCase()}, pas ${rep.cadran.toLowerCase()}`);
    }

    if (rep.boitier) {
        const ok = familleBoitier(montre.boitier) === rep.boitier;
        ajouter(1, ok ? 1 : 0, ok ? `Boîtier : ${valeur(montre.boitier).toLowerCase()}` : `Boîtier : ${valeur(montre.boitier).toLowerCase()}, pas « ${rep.boitier.toLowerCase()} »`);
    }

    if (rep.etancheite) {
        const ok = barsEtancheite(montre) >= Number(rep.etancheite);
        ajouter(1, ok ? 1 : 0, ok ? `Étanchéité suffisante (${LIBELLES.etancheite[rep.etancheite]})` : `Étanchéité insuffisante pour : ${LIBELLES.etancheite[rep.etancheite]}`);
    }

    const poidsTotal = criteres.reduce((somme, c) => somme + c.poids, 0);
    const points = criteres.reduce((somme, c) => somme + c.poids * c.score, 0);
    const pct = poidsTotal === 0 ? 100 : Math.round((points / poidsTotal) * 100);
    return { montre, pct, criteres };
}

function calculerClassement(rep) {
    return toutesLesMontres
        .map(montre => evaluer(montre, rep))
        .filter(Boolean)
        .sort((a, b) => b.pct - a.pct
            || Number(b.montre.populaire) - Number(a.montre.populaire)
            || a.montre.prix - b.montre.prix);
}

function resumeReponses(rep) {
    const liste = [rep.sansLimite ? "Budget : sans limite" : `Budget : ${formaterPrix(rep.budget)}`];
    if (rep.poignet) liste.push(`Poignet ${rep.poignet}`);
    if (rep.usage) liste.push(`Usage : ${LIBELLES.usage[rep.usage]}`);
    if (rep.mouvement) liste.push(`Mouvement ${rep.mouvement}`);
    if (rep.cadran) liste.push(`Cadran ${rep.cadran.toLowerCase()}`);
    if (rep.boitier) liste.push(`Boîtier : ${rep.boitier.toLowerCase()}`);
    if (rep.etancheite) liste.push(`Étanchéité : ${LIBELLES.etancheite[rep.etancheite]}`);
    return liste;
}

/* ----- Affichage du quiz ----- */

let ETAPES = [];
const etatQuiz = { etape: 0, reponses: reponsesParDefaut(), retourResultats: false };

function sauverQuiz(termine) {
    ecrireObjet(CLE_QUIZ, { reponses: etatQuiz.reponses, termine });
}

function creerBouton(texte, classe, action, desactive = false) {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = classe;
    bouton.textContent = texte;
    bouton.disabled = desactive;
    bouton.addEventListener("click", action);
    return bouton;
}

function creerBlocBudget(rep) {
    const plafond = plafondBudget();
    const bloc = document.createElement("div");
    bloc.className = "budget";

    const curseur = document.createElement("input");
    curseur.type = "range";
    curseur.min = 0;
    curseur.max = plafond;
    curseur.step = 5;
    curseur.id = "budget-curseur";
    curseur.setAttribute("aria-label", "Budget maximum en francs suisses");

    const champ = document.createElement("input");
    champ.type = "number";
    champ.min = 0;
    champ.max = plafond;
    champ.step = 5;
    champ.id = "budget-champ";
    champ.setAttribute("aria-label", "Budget exact en francs suisses");

    const ligne = document.createElement("div");
    ligne.className = "budget-champ";
    ligne.append(champ, " chf");

    const label = document.createElement("label");
    label.className = "sans-limite";
    const case0 = document.createElement("input");
    case0.type = "checkbox";
    label.append(case0, " Pas de limite de budget");

    const regler = valeurBudget => {
        const v = Math.min(plafond, Math.max(0, Math.round(Number(valeurBudget) || 0)));
        rep.budget = v;
        curseur.value = v;
        champ.value = v;
        sauverQuiz(false);
    };
    const limiter = sansLimite => {
        rep.sansLimite = sansLimite;
        case0.checked = sansLimite;
        curseur.disabled = sansLimite;
        champ.disabled = sansLimite;
        bloc.classList.toggle("inactif", sansLimite);
        sauverQuiz(false);
    };

    curseur.addEventListener("input", () => regler(curseur.value));
    champ.addEventListener("change", () => regler(champ.value));
    case0.addEventListener("change", () => limiter(case0.checked));

    const aide = document.createElement("p");
    aide.className = "aide";
    aide.textContent = "Les montres jusqu'à 10 % au-dessus de ton budget restent proposées, mais classées plus bas.";

    regler(rep.budget);
    limiter(rep.sansLimite);
    bloc.append(ligne, curseur, label, aide);
    return bloc;
}

function creerOptions(etape, rep) {
    const conteneur = document.createElement("div");
    conteneur.className = "options";
    const liste = [...etape.options, PEU_IMPORTE];

    liste.forEach(option => {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = etape.cle;
        radio.className = "sr-only";
        radio.checked = rep[etape.cle] === option.valeur;
        label.classList.toggle("choisie", radio.checked);

        const titre = document.createElement("span");
        titre.className = "option-titre";
        titre.textContent = option.titre;
        label.append(radio, titre);

        if (option.aide) {
            const aide = document.createElement("span");
            aide.className = "option-aide";
            aide.textContent = option.aide;
            label.append(aide);
        }

        radio.addEventListener("change", () => {
            rep[etape.cle] = option.valeur;
            conteneur.querySelectorAll(".option").forEach(autre => autre.classList.remove("choisie"));
            label.classList.add("choisie");
            sauverQuiz(false);
        });
        conteneur.append(label);
    });
    return conteneur;
}

function allerEtape(index, avecFocus = true) {
    etatQuiz.etape = index;
    afficherEtape(avecFocus);
}

function afficherEtape(avecFocus = true) {
    zoneResultats.hidden = true;
    zoneQuiz.hidden = false;

    const etape = ETAPES[etatQuiz.etape];
    const total = ETAPES.length;
    const numero = etatQuiz.etape + 1;
    const rep = etatQuiz.reponses;

    const progression = document.createElement("div");
    progression.className = "progression";
    progression.setAttribute("role", "progressbar");
    progression.setAttribute("aria-valuemin", 1);
    progression.setAttribute("aria-valuemax", total);
    progression.setAttribute("aria-valuenow", numero);
    progression.setAttribute("aria-label", `Question ${numero} sur ${total}`);
    const barre = document.createElement("span");
    barre.style.width = `${(numero / total) * 100}%`;
    progression.append(barre);

    const compteur = document.createElement("p");
    compteur.className = "compteur-question";
    compteur.textContent = `Question ${numero} sur ${total}`;

    const groupe = document.createElement("fieldset");
    groupe.className = "question";
    const legende = document.createElement("legend");
    legende.textContent = etape.question;
    legende.tabIndex = -1;
    groupe.append(legende, etape.cle === "budget" ? creerBlocBudget(rep) : creerOptions(etape, rep));

    const navigation = document.createElement("div");
    navigation.className = "navigation-quiz";
    navigation.append(creerBouton("Retour", "btn-sec", () => allerEtape(etatQuiz.etape - 1), etatQuiz.etape === 0));
    if (etatQuiz.retourResultats) {
        navigation.append(creerBouton("Voir les résultats", "btn-sec", terminerQuiz));
    }
    navigation.append(numero === total
        ? creerBouton("Voir mes résultats", "btn", terminerQuiz)
        : creerBouton("Suivant", "btn", () => allerEtape(etatQuiz.etape + 1)));

    zoneQuiz.replaceChildren(compteur, progression, groupe, navigation);
    if (avecFocus) legende.focus();
}

function terminerQuiz() {
    etatQuiz.retourResultats = false;
    sauverQuiz(true);
    afficherResultats();
}

function recommencer() {
    etatQuiz.reponses = reponsesParDefaut();
    etatQuiz.retourResultats = false;
    effacer(CLE_QUIZ);
    effacer(CLE_AVIS);
    allerEtape(0);
}

function modifierReponse(cle) {
    const index = ETAPES.findIndex(etape => etape.cle === cle);
    etatQuiz.retourResultats = true;
    allerEtape(Math.max(0, index));
}

/* ----- Avis (notes) ----- */

function nouvelAvis(empreinte) {
    return { empreinte, global: 0, montres: {}, commentaire: "", envoye: false };
}

function creerEtoiles(valeurInitiale, libelle, surChoix) {
    const groupe = document.createElement("div");
    groupe.className = "etoiles";
    groupe.setAttribute("role", "group");
    groupe.setAttribute("aria-label", libelle);

    const boutons = [1, 2, 3, 4, 5].map(n => {
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.setAttribute("aria-label", `${n} étoile${n > 1 ? "s" : ""} sur 5`);
        bouton.addEventListener("click", () => {
            majEtoiles(n);
            surChoix(n);
        });
        groupe.append(bouton);
        return bouton;
    });

    function majEtoiles(note) {
        boutons.forEach((bouton, i) => {
            bouton.textContent = i < note ? "★" : "☆";
            bouton.setAttribute("aria-pressed", i + 1 === note);
        });
    }

    majEtoiles(valeurInitiale);
    return groupe;
}

async function envoyerAvis(avis, rep, podium, statut, bouton, piege) {
    if (avis.global === 0) {
        statut.textContent = "Choisis d'abord une note pour le résultat.";
        return;
    }

    if (!CLE_WEB3FORMS) {
        avis.envoye = true;
        ecrireObjet(CLE_AVIS, avis);
        statut.textContent = "Merci ! Ton avis est enregistré sur cet appareil.";
        return;
    }

    bouton.disabled = true;
    statut.textContent = "Envoi en cours…";
    try {
        const reponse = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
                access_key: CLE_WEB3FORMS,
                subject: "Nouvel avis ChronoID",
                from_name: "ChronoID",
                botcheck: piege.checked,
                note_globale: `${avis.global}/5`,
                commentaire: avis.commentaire || "(aucun)",
                reponses_quiz: resumeReponses(rep).join(" | "),
                montres_proposees: podium.map((r, i) =>
                    `${i + 1}. ${r.montre.marque.nom} ${r.montre.nom} (${r.pct} %) : note ${avis.montres[r.montre.id] || "non notée"}`
                ).join("\n") || "(aucune montre proposée)"
            })
        });
        const donnees = await reponse.json();
        if (!reponse.ok || !donnees.success) throw new Error("envoi refusé");
        avis.envoye = true;
        ecrireObjet(CLE_AVIS, avis);
        statut.textContent = "Merci pour ton avis, il a bien été envoyé !";
    } catch (erreur) {
        bouton.disabled = false;
        statut.textContent = "L'envoi a échoué. Ton avis reste enregistré sur cet appareil, tu peux réessayer.";
    }
}

/* ----- Affichage des résultats ----- */

function creerCarteResultat(resultat, rang, avis) {
    const { montre, pct, criteres } = resultat;
    const carte = creerCarte(montre);
    if (rang === 0) carte.classList.add("premier");

    const rangTexte = document.createElement("p");
    rangTexte.className = "rang";
    rangTexte.textContent = rang === 0 ? "Notre choix pour toi" : `${rang + 1}e choix`;

    const correspondance = document.createElement("p");
    correspondance.className = "pct";
    correspondance.innerHTML = `<strong>${pct} %</strong> de correspondance`;

    const raisons = document.createElement("ul");
    raisons.className = "raisons";
    criteres.forEach(critere => {
        const li = document.createElement("li");
        li.className = critere.score >= 1 ? "ok" : critere.score > 0 ? "partiel" : "non";
        const marque = document.createElement("span");
        marque.setAttribute("aria-hidden", "true");
        marque.textContent = critere.score >= 1 ? "✓" : critere.score > 0 ? "~" : "✗";
        li.append(marque, ` ${critere.texte}`);
        raisons.append(li);
    });

    const note = document.createElement("div");
    note.className = "note-montre";
    const noteTexte = document.createElement("span");
    noteTexte.textContent = "Ta note :";
    note.append(noteTexte, creerEtoiles(avis.montres[montre.id] || 0,
        `Note pour ${montre.marque.nom} ${montre.nom}`, n => {
            avis.montres[montre.id] = n;
            ecrireObjet(CLE_AVIS, avis);
        }));

    carte.prepend(correspondance);
    carte.prepend(rangTexte);
    carte.insertBefore(raisons, carte.lastElementChild);
    carte.insertBefore(note, carte.lastElementChild);
    return carte;
}

function creerBlocAvis(avis, rep, podium) {
    const bloc = document.createElement("section");
    bloc.className = "avis";

    const titre = document.createElement("h2");
    titre.textContent = "Ce résultat te convient-il ?";

    const probleme = document.createElement("div");
    probleme.className = "probleme";
    probleme.hidden = true;
    const questionProbleme = document.createElement("p");
    questionProbleme.textContent = "Qu'est-ce qui n'allait pas ? Choisis ce que tu veux changer :";
    const choix = document.createElement("div");
    choix.className = "choix-probleme";
    [["Le budget", "budget"], ["La taille", "poignet"], ["L'usage", "usage"],
     ["Le mouvement", "mouvement"], ["La couleur", "cadran"], ["La matière", "boitier"]]
        .forEach(([texte, cle]) => choix.append(creerBouton(texte, "btn-sec", () => modifierReponse(cle))));
    probleme.append(questionProbleme, choix);

    const etoiles = creerEtoiles(avis.global, "Note globale du résultat", n => {
        avis.global = n;
        ecrireObjet(CLE_AVIS, avis);
        probleme.hidden = n > 2;
    });
    probleme.hidden = !(avis.global > 0 && avis.global <= 2);

    const etiquette = document.createElement("label");
    etiquette.htmlFor = "commentaire";
    etiquette.textContent = "Un commentaire ? (facultatif)";
    const commentaire = document.createElement("textarea");
    commentaire.id = "commentaire";
    commentaire.rows = 3;
    commentaire.maxLength = 500;
    commentaire.value = avis.commentaire;
    commentaire.addEventListener("input", () => {
        avis.commentaire = commentaire.value;
        ecrireObjet(CLE_AVIS, avis);
    });

    // Champ piège contre les robots (invisible pour les humains)
    const piege = document.createElement("input");
    piege.type = "checkbox";
    piege.name = "botcheck";
    piege.tabIndex = -1;
    piege.setAttribute("aria-hidden", "true");
    piege.hidden = true;

    const statut = document.createElement("p");
    statut.className = "statut-avis";
    statut.setAttribute("role", "status");
    if (avis.envoye) {
        statut.textContent = CLE_WEB3FORMS ? "Merci pour ton avis, il a bien été envoyé !" : "Merci ! Ton avis est enregistré sur cet appareil.";
    }

    const bouton = creerBouton("Envoyer mon avis", "btn", () => envoyerAvis(avis, rep, podium, statut, bouton, piege));

    const confidentialite = document.createElement("p");
    confidentialite.className = "aide";
    confidentialite.textContent = CLE_WEB3FORMS
        ? "Sont envoyés : ta note, tes notes par montre, ton commentaire et tes réponses au quiz. Aucune donnée personnelle n'est demandée."
        : "Ton avis reste enregistré dans ton navigateur et n'est envoyé à personne.";

    bloc.append(titre, etoiles, probleme, etiquette, commentaire, piege, bouton, statut, confidentialite);
    return bloc;
}

function afficherResultats(avecFocus = true) {
    zoneQuiz.hidden = true;
    zoneResultats.hidden = false;

    const rep = etatQuiz.reponses;
    const classement = calculerClassement(rep);
    const podium = classement.slice(0, 3);

    const empreinte = JSON.stringify(rep);
    let avis = lireObjet(CLE_AVIS);
    if (!avis || avis.empreinte !== empreinte) {
        avis = nouvelAvis(empreinte);
        ecrireObjet(CLE_AVIS, avis);
    }

    const titre = document.createElement("h2");
    titre.textContent = "Tes résultats";
    titre.tabIndex = -1;

    const etiquettes = document.createElement("ul");
    etiquettes.className = "etiquettes";
    resumeReponses(rep).forEach(texte => {
        const li = document.createElement("li");
        li.textContent = texte;
        etiquettes.append(li);
    });

    const actions = document.createElement("div");
    actions.className = "navigation-quiz";
    actions.append(
        creerBouton("Modifier mes réponses", "btn-sec", () => { etatQuiz.retourResultats = true; allerEtape(0); }),
        creerBouton("Recommencer", "btn-sec", recommencer)
    );

    const elements = [titre, etiquettes, actions];

    if (podium.length === 0) {
        const vide = document.createElement("p");
        vide.className = "vide";
        vide.textContent = "Aucune montre ne correspond à ce budget. Augmente le budget ou choisis « Pas de limite de budget » dans tes réponses.";
        elements.push(vide);
    } else {
        if (resumeReponses(rep).length === 1 && rep.sansLimite) {
            const note = document.createElement("p");
            note.className = "aide";
            note.textContent = "Tu n'as fixé aucun critère : voici simplement nos montres populaires.";
            elements.push(note);
        }
        const grille = document.createElement("div");
        grille.className = "podium";
        podium.forEach((resultat, rang) => grille.append(creerCarteResultat(resultat, rang, avis)));
        elements.push(grille, creerBlocAvis(avis, rep, podium));
    }

    zoneResultats.replaceChildren(...elements);
    if (avecFocus) titre.focus();
}

/* ----- Démarrage ----- */

if (zoneQuiz && zoneResultats) {
    ETAPES = creerEtapes();
    const enregistre = lireObjet(CLE_QUIZ);
    if (enregistre && enregistre.reponses) {
        Object.assign(etatQuiz.reponses, enregistre.reponses);
        // une réponse enregistrée qui n'existe plus (catalogue modifié) est oubliée
        ETAPES.filter(etape => etape.options).forEach(etape => {
            const valeurs = etape.options.map(option => option.valeur);
            if (!valeurs.includes(etatQuiz.reponses[etape.cle])) etatQuiz.reponses[etape.cle] = null;
        });
    }
    if (enregistre && enregistre.termine) {
        afficherResultats(false);
    } else {
        afficherEtape(false);
    }
}