'use strict';

var Rectangle = function(){
    this.abscisse = 0;
    this.ordonnee = 0; 
    this.width = 20;
    this.height = 20;
    this.couleur = "";
}

Rectangle.prototype.setX = function(x){
    this.abscisse = x;
}

Rectangle.prototype.setY = function(y){
    this.ordonnee = y;
}

Rectangle.prototype.setColor = function(c){
    this.couleur = c;
}

Rectangle.prototype.afficherRectangle = function(ctx2){
    ctx2.fillStyle = this.couleur;
    ctx2.fillRect(this.abscisse, this.ordonnee, this.width, this.height);
}