
//We shouldn't need to munipulate the DOM except through raphael.js
//function $(q){return document.querySelector(q);}
var π,pi=π=Math.PI;

var paper=Raphael(document.body,"100%","100%");
paper.line = function(x1,y1,x2,y2){
	return this.path("M"+x1+" "+y1+"L"+x2+" "+y2);
}
/*paper.arc = function(r, centerX, centerY, radius, startAngle, endAngle) {
	var startX = centerX+radius*Math.cos((90-startAngle)*Math.PI/180); 
	var startY = centerY-radius*Math.sin((90-startAngle)*Math.PI/180);
	var endX = centerX+radius*Math.cos((90-endAngle)*Math.PI/180);
	var endY = centerY-radius*Math.sin((90-endAngle)*Math.PI/180);
	return r.path([['M',startX, startY],['A',radius,radius,0,1,1,endX,endY]]);
}*/


var boardSize=4;
var board=[];
var cardTypes=["Put back a F.F.F. card.","Pick up a F.F.F. card.","Lose next turn.","Escape to the nearest cave."];
var deck=[];

var boardSet=paper.set();

drawBoard();

function drawBoard(){
	
	boardSet.remove();
	
	var centerX=parseFloat(getComputedStyle(document.documentElement).width)/2;
	var centerY=parseFloat(getComputedStyle(document.documentElement).height)/2;
	var boardRadius=Math.min(centerX,centerY)*0.9;
	
	var d="M"+(centerX+Math.sin(pi*2/3)*boardRadius)+" "+(centerY+Math.cos(pi*2/3)*boardRadius);
	for(var s=0; s<6; s++){
		var sidex1=centerX+Math.sin(pi*(2+s)/3)*boardRadius;
		var sidey1=centerY+Math.cos(pi*(2+s)/3)*boardRadius;
		var sidex2=centerX+Math.sin(pi*(1+s)/3)*boardRadius;
		var sidey2=centerY+Math.cos(pi*(1+s)/3)*boardRadius;
		
		for(var i=0; i<boardSize; i++){
			var x1=sidex1+(sidex2-sidex1)*((i+0.5)/boardSize);
			var y1=sidey1+(sidey2-sidey1)*((i+0.5)/boardSize);
			boardSet.push(paper.circle(x1,y1,boardRadius/boardSize/2).attr({"fill":"#EEE","stroke":"black"}));
		}
		d+="L"+sidex1+" "+sidey1;
	}
	
	var outerBoard=paper.path(d+"z");
	outerBoard.attr({"fill":"#FFE"});
	boardSet.push(outerBoard);
	
	for(var s=0; s<6; s++){
		var sidex1=centerX+Math.sin(pi*(2+s)/3)*boardRadius;
		var sidey1=centerY+Math.cos(pi*(2+s)/3)*boardRadius;
		var sidex2=centerX+Math.sin(pi*(1+s)/3)*boardRadius;
		var sidey2=centerY+Math.cos(pi*(1+s)/3)*boardRadius;
		
		var side2x1=centerX+Math.sin(pi*(3+s)/3)*boardRadius;
		var side2y1=centerY+Math.cos(pi*(3+s)/3)*boardRadius;
		var side2x2=centerX+Math.sin(pi*(4+s)/3)*boardRadius;
		var side2y2=centerY+Math.cos(pi*(4+s)/3)*boardRadius;
		
		for(var i=0; i<=boardSize; i++){
			var x1=sidex1+(sidex2-sidex1)*(i/boardSize);
			var y1=sidey1+(sidey2-sidey1)*(i/boardSize);
			var x2=side2x1+(side2x2-side2x1)*(i/boardSize);
			var y2=side2y1+(side2y2-side2y1)*(i/boardSize);
			boardSet.push(paper.line(x1,y1,x2,y2));
		}
	}
}

document.body.onkeypress=function(e){if(e.charCode>=48&&e.charCode<=57){boardSize=e.charCode-48;drawBoard();}};
window.onresize=function(){drawBoard();};