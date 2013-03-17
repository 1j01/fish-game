
//We shouldn't need to munipulate the DOM except through raphael.js
//function $(q){return document.querySelector(q);}

var paper=Raphael(document.body,"100%","100%");

//var circle=paper.circle(50,50,15);

//It turns out hexagons aren't square grids.
board=[];
deck=[];

//placeholder "board
paper.path("M 373.9 433 L 127.1 433 L 2.5 216 L 127.1 1.4 L 373.9 1.4 L 498.5 216 L 373.9 433 L 373.9 433");
