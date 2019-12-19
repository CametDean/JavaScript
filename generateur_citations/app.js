"use strict";

//===== CRÉER UN GÉNÉRATEUR DE CITATION =====

var sujet = ["Camille", "Kathleen", "Inès", "Margot", "Victorine"];
var verbe = ["aime", "vole", "mange", "boit", 'utilise'];
var complement = ["les escargots.", "des pommes.", "du vin.", "des cerises.", "des vétements."];

var sujet2 = ["Aristote", "Hypocrate", "Socrate", "Perséphone", "Poséidon"];
var verbe2 = ["adore", "chante", "danse", "boit", 'lance'];
var complement2 = ["des pneus.", "des chansons.", "du pain.", "des poèles.", "des surimis."];

function generate_random(max) {
    return Math.floor((Math.random() * max) + 1);
}

function generate_citation1(max) {
    var tab = [];
    for (var i = 0; i < max; i++) {
        var citation = sujet[generate_random(4)] + " " + verbe[generate_random(4)] + " " + complement[generate_random(4)];
        tab[i] = citation;
    }
    return tab;
}

function generate_citation2(max) {
    var tableau = [];
    for (var i = 0; i < max; i++) {
        var citation = sujet2[generate_random(4)] + " " + verbe2[generate_random(4)] + " " + complement2[generate_random(4)];
        tableau[i] = citation;
    }
    return tableau;
}

function init() {
    console.log("Bienvenue dans le générateur de citation, vous pouvez générer entre 1 et 5 citation(s) !");
    console.log("1 : Générateur Humoristique");
    console.log("2 : Générateur Historique");

    var choix = parseInt(prompt("Choisissez un des générateurs suivants : "));

    switch (choix) {
        case 1:
            console.log("Tu as choisi le générateur humoristique!");
            break;
        case 2:
            console.log("Tu as choisi le générateur historique!");
            break;
        default:
            break;
    }
    return choix;
}

function boucleJeu() {

    var choix = init();
    var proposition;

    while (proposition != 0) {
        console.log("1 : Générer 1 citation : ");
        console.log("2 : Générer 2 citations : ");
        console.log("3 : Générer 3 citations : ");
        console.log("4 : Générer 4 citations : ");
        console.log("5 : Générer 5 citations : ");
        console.log("# : Rejouer");
        console.log("0 : Quitter");
        proposition = prompt("Choisissez une option : ");

        if ((proposition > 0) && (proposition <= 5)) {

            if (choix == 1) {
                var tableau_citation = generate_citation1(proposition);
                for (var i = 0; i < proposition; i++) {
                    console.log("Voici la citation " + (i + 1) + " : " + tableau_citation[i]);
                }
            } else if (choix == 2) {
                var tableau_citation = generate_citation2(proposition);
                for (var i = 0; i < proposition; i++) {
                    console.log("Voici la citation " + (i + 1) + " : " + tableau_citation[i]);
                }
            }

        } else if (proposition > 5) {
            console.log("Veuillez saisir un chiffre entre 1 et 5 pour générer des citations ou 0 pour quitter.");

        } else if (proposition == "#") {
            boucleJeu();
            break;

        } else if (proposition == 0) {
            console.log("Au revoir !");
        }
    }
}

boucleJeu();