"use strict";

/*CREATION PERSONNAGES*/
var player = {
    "name": "",
    "PDV": 100,
    "damages": 20,
    "choix": "",

    attaque: function () {
        if (player.choix == "1") {
            dragon.PDV -= player.damages;
        } else if (player.choix == "2") {
            phoenix.PDV -= player.damages;
        } else if (player.choix == "3") {
            chien.PDV -= player.damages;
        }
    },

    defense: function () {
        if (player.choix == "1") {
            player.PDV -= (dragon.damages / 2);
        } else if (player.choix == "2") {
            player.PDV -= (phoenix.damages / 2);
        } else if (player.choix == "3") {
            player.PDV -= (chien.damages / 2);
        }
    }
}

var dragon = {
    "PDV": 100,
    "damages": 20,

    attaque: function () {
        player.PDV -= dragon.damages;
    },

    defense: function () {
        dragon.PDV -= (player.damages / 2);
    }
}

var phoenix = {
    "PDV": 70,
    "damages": 10,

    attaque: function () {
        player.PDV -= phoenix.damages;
    },

    defense: function () {
        phoenix.PDV -= (player.damages / 2);
    }
}

var chien = {
    "PDV": 50,
    "damages": 5,

    attaque: function () {
        player.PDV -= chien.damages;
    },

    defense: function () {
        chien.PDV -= (player.damages / 2);
    }
}

/*CREATION ACTIONS*/
function actionDragon() {
    var action = Math.random();
    if (action <= 0.4) {
        dragon.attaque();
    } else if (action > 0.4 && action <= 1) {
        dragon.defense();
    }
}

function actionPhoenix() {
    var action = Math.random();
    if (action <= 0.4) {
        phoenix.attaque();
    } else if (action > 0.4 && action <= 1) {
        phoenix.defense();
    }
}

function actionChien() {
    var action = Math.random();
    if (action <= 0.4) {
        chien.attaque();
    } else if (action > 0.4 && action <= 1) {
        chien.defense();
    }
}

function generate_random(max) {
    return Math.floor((Math.random() * max) + 1);
}


/*EXECUTION JEU*/
var applauze = document.querySelector(".applaudissements");
var victoire = document.querySelector(".victoire");
var devinettes = ["Qu'est-ce qui est petit et marron?", "Qui a pour devise 'Le gras, c'est la vie'?", "Quel est le péché mignon de Guenièvre?"];
var question = devinettes[generate_random(2)];


$(document).ready(function () {
    $("#nom_joueur").val('');
    $("input[name='portes']:checked").val('');
    $("input[name='action']:checked").val('');
    $("#devinette").val('');

    $(".choix").hide();
    $(".action").hide();
    $("#devinette").hide();
    $(".rejouer").hide();

    $(".instruction").text("Bonjour, quel est ton nom?");

    $("#next").click(function () {
        player.name = $("#nom_joueur").val();
        $("#nom_joueur").hide();
        $(".choix").show();

        $(".instruction").text("Bonjour " + player.name + ", tu as pour mission de sauver la princesse! Tu dois d'abords réussir deux épreuves. La première se trouve derrière l'une de ces portes. Laquelle choisis-tu?");

        $("#next").click(function () {

            player.choix = $("input[name='portes']:checked").val();
            $("#nom_joueur").hide();
            $(".choix").hide();

            switch (player.choix) {
                case "Porte Bleue":
                    $(".instruction").text("Tu as choisi la porte bleue, tu te retrouves face au dragon! Que veux-tu faire?");
                    $(".action").show();

                    $("#next").click(function () {
                        player.initiative = $("input[name='action']:checked").val();

                        switch (player.initiative) {
                            case "1":
                                player.attaque();
                                break;
                            case "2":
                                player.defense();
                                break;
                            default:
                                break;
                        }
                        actionDragon();
                        $(".instruction").text("Les PDV du chevalier sont de maintenant " + player.PDV + " et ceux du dragon sont de " + dragon.PDV + ".");

                        if (player.PDV <= 0) {

                            $(".instruction").text("Tu as perdu face au dragon...");
                            $(".action").hide();
                            $("#next").hide();
                            $(".rejouer").show();

                            $("#rejouer").click(function () {
                                location.reload();
                            });

                            $("#quitter").click(function () {
                                $(".instruction").text("Au revoir");
                                $(".rejouer").hide();
                            });

                        } else if (dragon.PDV <= 0) {

                            $(".instruction").text("Tu as gagné face au dragon! Par ici!");
                            applauze.setAttribute("autoplay", "true");
                            $(".action").hide();

                            $("#next").click(function () {

                                $(".instruction").text("Voici l'étape finale ! Il te faut résoudre l'énigme afin de libérer la princesse. Es-tu prêt? " + question + " ");
                                $(".rejouer").hide();
                                $("#next").show();
                                $("#devinette").show();

                                $("#next").click(function () {
                                    var suggestion = $("#devinette").val();

                                    if (question == devinettes[0]) {
                                        if (suggestion == "Un marron") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");

                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    } else if (question == devinettes[1]) {
                                        if (suggestion == "Karadoc") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");

                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");

                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    } else if (question == devinettes[2]) {
                                        if (suggestion == "La pâte d'amande") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");

                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");

                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    }
                                });
                            })
                        }

                    });



                    break;
                case "Porte Rouge":
                    $(".instruction").text("Tu as choisi la porte rouge, tu te retrouves face au phoenix! Que veux-tu faire?");
                    $(".action").show();

                    $("#next").click(function () {
                        player.initiative = $("input[name='action']:checked").val();

                        switch (player.initiative) {
                            case "1":
                                player.attaque();
                                break;
                            case "2":
                                player.defense();
                                break;
                            default:
                                break;
                        }
                        actionPhoenix();
                        $(".instruction").text("Les PDV du chevalier sont de maintenant " + player.PDV + " et ceux du phoenix sont de " + phoenix.PDV + ".");

                        if (player.PDV <= 0) {

                            $(".instruction").text("Tu as perdu face au phoenix...");
                            $(".action").hide();
                            $("#next").hide();
                            $(".rejouer").show();

                            $("#rejouer").click(function () {
                                location.reload();
                            });

                            $("#quitter").click(function () {
                                $(".instruction").text("Au revoir");
                                $(".rejouer").hide();
                            });

                        } else if (phoenix.PDV <= 0) {

                            $(".instruction").text("Tu as gagné face au phoenix! Par ici!");
                            applauze.setAttribute("autoplay", "true");
                            $(".action").hide();

                            $("#next").click(function () {

                                $(".instruction").text("Voici l'étape finale ! Il te faut résoudre l'énigme afin de libérer la princesse. Es-tu prêt? " + question + " ");

                                $("#devinette").show();

                                $("#next").click(function () {
                                    var suggestion = $("#devinette").val();

                                    if (question == devinettes[0]) {
                                        if (suggestion == "Un marron") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    } else if (question == devinettes[1]) {
                                        if (suggestion == "Karadoc") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    } else if (question == devinettes[2]) {
                                        if (suggestion == "La pâte d'amande") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    }
                                });
                            })
                        }

                    });
                    break;

                case "Porte Verte":
                    $(".instruction").text("Tu as choisi la porte verte, tu te retrouves face au chien! Que veux-tu faire?");
                    $(".action").show();

                    $("#next").click(function () {
                        player.initiative = $("input[name='action']:checked").val();

                        switch (player.initiative) {
                            case "1":
                                player.attaque();
                                break;
                            case "2":
                                player.defense();
                                break;
                            default:
                                break;
                        }
                        actionChien();
                        $(".instruction").text("Les PDV du chevalier sont de maintenant " + player.PDV + " et ceux du chien sont de " + chien.PDV + ".");

                        if (player.PDV <= 0) {

                            $(".instruction").text("Tu as perdu face au chien...");
                            $(".action").hide();
                            $("#next").hide();
                            $(".rejouer").show();

                            $("#rejouer").click(function () {
                                location.reload();
                            });

                            $("#quitter").click(function () {
                                $(".instruction").text("Au revoir");
                                $(".rejouer").hide();
                            });

                        } else if (chien.PDV <= 0) {

                            $(".instruction").text("Tu as gagné face au chien! Par ici!");
                            applauze.setAttribute("autoplay", "true");
                            $(".action").hide();

                            $("#next").click(function () {

                                $(".instruction").text("Voici l'étape finale ! Il te faut résoudre l'énigme afin de libérer la princesse. Es-tu prêt? " + question + " ");

                                $("#devinette").show();

                                $("#next").click(function () {
                                    var suggestion = $("#devinette").val();
                                    $("#devinette").hide();

                                    if (question == devinettes[0]) {
                                        if (suggestion == "Un marron") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    } else if (question == devinettes[1]) {
                                        if (suggestion == "Karadoc") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    } else if (question == devinettes[2]) {
                                        if (suggestion == "La pâte d'amande") {
                                            victoire.setAttribute("autoplay", "true");
                                            $(".instruction").text("Tu as trouvé la réponse! Tu as sauvé la princesse!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        } else {
                                            $(".instruction").text("Ce n'est pas la bonne réponse... Retour à la case départ!");
                                            $("#devinette").hide();
                                            $("#next").hide();
                                            $(".rejouer").show();

                                            $("#rejouer").click(function () {
                                                location.reload();
                                            });

                                            $("#quitter").click(function () {
                                                $(".instruction").text("Au revoir");
                                                $(".rejouer").hide();
                                            });
                                        }
                                    }
                                });
                            })
                        }
                    });
                    break;
                default:
                    break;
            }

        })

    })
})