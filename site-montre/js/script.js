const montrePop = document.querySelector("#montre");
const listeMontre = document.querySelector("#liste-montre");


let changeMontre;
let nbChange = 0;

class Montre {
    constructor(nom, marque, prix, diametre, image, mouvement) {
        this.nom = nom;
        this.marque = marque;
        this.prix = prix;
        this.diametre = diametre;
        this.image = image;
        this.mouvement = mouvement;
    }
}

let montres = [
    new Montre(
        "Tissot prx",
        "Tissot",
        365,
        40,
        "../img/tissot/prx-bleu.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        795,
        38,
        "../img/tissot/prx-titane.webp",
        "Automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        435,
        41,
        "../img/tissot/prx-chrono-noir.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        1795,
        42,
        "../img/tissot/prx-chrono-premium.webp",
        "valijoux automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        965,
        40.5,
        "../img/tissot/prx-carbone.webp",
        "automatique"
    ),
    new Montre(
        "Tissot prx",
        "Tissot",
        365,
        40,
        "../img/tissot/prx-bleu.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        795,
        38,
        "../img/tissot/prx-titane.webp",
        "Automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        435,
        41,
        "../img/tissot/prx-chrono-noir.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        1795,
        42,
        "../img/tissot/prx-chrono-premium.webp",
        "valijoux automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        965,
        40.5,
        "../img/tissot/prx-carbone.webp",
        "automatique"
    ),
    new Montre(
        "Tissot prx",
        "Tissot",
        365,
        40,
        "../img/tissot/prx-bleu.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        795,
        38,
        "../img/tissot/prx-titane.webp",
        "Automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        435,
        41,
        "../img/tissot/prx-chrono-noir.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        1795,
        42,
        "../img/tissot/prx-chrono-premium.webp",
        "valijoux automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        965,
        40.5,
        "../img/tissot/prx-carbone.webp",
        "automatique"
    ),
    new Montre(
        "Tissot prx",
        "Tissot",
        365,
        40,
        "../img/tissot/prx-bleu.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        795,
        38,
        "../img/tissot/prx-titane.webp",
        "Automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        435,
        41,
        "../img/tissot/prx-chrono-noir.webp",
        "quartz"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        1795,
        42,
        "../img/tissot/prx-chrono-premium.webp",
        "valijoux automatique"
    ),

    new Montre(
        "Tissot prx",
        "Tissot",
        965,
        40.5,
        "../img/tissot/prx-carbone.webp",
        "automatique"
    ),
];

if (window.location.pathname.includes("acceuille.html")) {
    montreChange();
    changeMontre = setInterval(montreChange,2500)    
}

if (window.location.pathname.includes("liste-montre.html")) {
    creerImg();
}

function montreChange(){
    if(nbChange <= montres.length - 1){
        montrePop.src = montres[nbChange].image;
        nbChange++;
    }else{
        nbChange = 0;
        montrePop.src = montres[nbChange].image;
    }
}

function creerImg(){ 
    montres.forEach(value => {

        // <div class="montre">
        let montre = document.createElement("div");
        montre.className = "montre";

        // <img>
        let img = document.createElement("img");
        img.src = value.image;
        img.alt = value.nom;

        // <p>
        let texte = document.createElement("p");
        texte.innerHTML = `${value.nom}<br>
                          ${value.prix} chf<br>
                          ${value.diametre}mm<br>
                          ${value.mouvement}`;

        // On met img et p dans div.montre
        montre.appendChild(img);
        montre.appendChild(texte);

        // On met div.montre dans #liste-montre
        listeMontre.appendChild(montre);
    });  
}
