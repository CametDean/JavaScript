"use strict";

var solution = Math.floor(Math.random() * 100) + 1;
var tentative = 1;
var maxTentatives = 7;

var nombre = parseInt(prompt("Trouves le nombre mystère!"));

do {
    if (nombre < solution) {
        nombre = parseInt(prompt("Trop petit! Essaies encore!"));
    } else if (nombre > solution) {
        nombre = parseInt(prompt("Trop grand! Essaies encore!"));
    } else {
        alert("Tu as trouvé le nombre mystère : " + solution);
    }
    tentative++;

    
} while (tentative != maxTentatives);

if (tentative == maxTentatives) {
    alert("Tu as atteint le nombre maximal de tentatives...");
}