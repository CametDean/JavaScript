"use strict "
var mousePressed = false;
var lastX, lastY;
var ctx;
var color;
var epaisseur;

function InitThis() {
   ctx = document.getElementById('canvas').getContext("2d");
   ctx2 = document.getElementById('dessin').getContext('2d');

   //DESSINER
   $('#canvas').mousedown(function (e) {
       mousePressed = true;
       Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
   });

   $('#canvas').mousemove(function (e) {
       if (mousePressed) {
           Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
       }
   });

   $('#canvas').mouseup(function (e) {
       mousePressed = false;
   });

    $('#canvas').mouseleave(function (e) {
       mousePressed = false;
   });


   //AFFICHER/CACHER LE SELECTEUR
   $('.selector').click(function(){
       $('.content').toggle();
   })


   //REMPLIR LE CANVAS 
   $('.fill').click(function(){
       ctx.fillStyle = color;
       ctx.fillRect(0,0,canvas.width, canvas.height);
   })


   //EFFACER
   $('.erase').click(function(){
       ctx.clearRect(0, 0, canvas.width, canvas.height);
   });


   //RONDS DE COULEURS
    $(".couleurs a").each(function(){
        $(this).css("background", $(this).attr("data-couleur"));

        $(this).click(function(){
            color = $(this).attr("data-couleur");
        })
    });

    
    //LARGEUR PINCEAU
    $('#fin').click(function(){
        epaisseur = 2;
    })

    $('#normale').click(function(){
        epaisseur = 5;
    })

    $('#epais').click(function(){
        epaisseur = 10;
    })


    //PICKER AVEC CANVAS 
 
    var ordonnee = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
    
    for (var b = 0; b < ordonnee.length; b++){
        
        var gradient = ctx2.createLinearGradient(0, 0, 280, 0);
        
        gradient.addColorStop(0,    "rgb(255,   0,   0)");
        gradient.addColorStop(0.15, "rgb(255,   0, 255)");
        gradient.addColorStop(0.33, "rgb(0,     0, 255)");
        gradient.addColorStop(0.49, "rgb(0,   255, 255)");
        gradient.addColorStop(0.67, "rgb(0,   255,   0)");
        gradient.addColorStop(0.84, "rgb(255, 255,   0)");
        gradient.addColorStop(1,    "rgb(255,   0,   0)");
        ctx2.fillStyle = gradient;
        ctx2.fillRect(0, ordonnee[b], 400, 20);

        gradient = ctx2.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");

        ctx2.fillStyle = gradient;
        ctx2.fillRect(0, ordonnee[b], 400, 200);
    }


    $('#dessin').click(function(e){
        var mouseX = e.offsetX;
        var mouseY = e.offsetY;

        getColor(mouseX,mouseY);
    })

};
   


function Draw(x, y, isDown){

   if (isDown) {
       ctx.beginPath();
       ctx.lineWidth = epaisseur;
       ctx.lineJoin = "round";
       ctx.strokeStyle = color;
       ctx.moveTo(lastX, lastY);
       ctx.lineTo(x, y);
       ctx.closePath();
       ctx.stroke();
   }
   lastX = x;
   lastY = y;
}

function getColor(x,y){
    var imagedata = ctx2.getImageData(x, y, 1, 1);
    var selectedColor = 'rgb('+imagedata.data[0]+ ',' +imagedata.data[1]+ ',' +imagedata.data[2]+ ')';
    color = selectedColor;
    return color;
}


InitThis();

