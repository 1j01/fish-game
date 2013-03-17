
//We shouldn't need to munipulate the DOM except through raphael.js
//function $(q){return document.querySelector(q);}

var paper=Raphael(document.body,"100%","100%");
paper.line = function(x1,y1,x2,y2){
	return this.path("M"+x1+" "+y1+"L"+x2+" "+y2);
}

//var circle=paper.circle(50,50,15);

//It turns out hexagons aren't square grids.
board=[];
cardTypes=["Put back a F.F.F. card.","Pick up a F.F.F. card.","Lose next turn.","Escape to the nearest cave."];
deck=[];

//placeholder "board"
paper.path("M 373.9 433 L 127.1 433 L 2.5 216 L 127.1 1.4 L 373.9 1.4 L 498.5 216 L 373.9 433 L 373.9 433");
