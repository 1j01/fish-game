
//function $(q){return document.querySelector(q);}
//var π,pi=π=Math.PI;
var pi=Math.PI;

if(window.Ralphio){
	//var paper=new Ralphio(document.body,"100%","100%");
	//default arguments; new is unnesesary;
	var paper=Ralphio();
}else{
	var paper=new Raphael(document.body,"100%","100%");
}

paper.line = paper.line
//
||	/*
\\  */
function(x1,y1,x2,y2){
	return this.path("M"+x1+" "+y1+"L"+x2+" "+y2);
};
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
	
    
    /// draw caves
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
	
    /// draw triangles
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
    for(var y = 0; y<getRowCount(); y++){
        for(var x = minXAt(y); x < maxXAt(y); x++){
            drawCircleAt(x, y, centerX, centerY, boardRadius);
        }
    }
    ///Make it look all ugly and stuff.
	//if(paper.shapes&&paper.shapes[0]&&paper.shapes[0].moveBy){
	//	var r = Math.sqrt(centerY*centerX)/50;
	//	for(var i=0;i<paper.shapes.length;i++){
	//		paper.shapes[i].moveBy((Math.random()-0.5)*r,(Math.random()-0.5)*r,(Math.random()-0.5)*r,(Math.random()-0.5)*r);
	//	}
	//}
       
}
function minXAt(yFromTop){
    return -1*getWidthAt(yFromTop)/2;
}
function maxXAt(yFromTop){
    return getWidthAt(yFromTop)/2;
}
function pointsLeft(xFromCenter, yFromTop){
    if(((1+ Math.abs(xFromCenter))%2 + Math.abs(yFromTop)%2)%2 ==1 ){
        return true;
    }
    return false;
}

function getRowCount(){
    return 4*boardSize;
}

function getWidthAt(yFromTop){
    var section = Math.floor(yFromTop/boardSize);
    var depthInSection = yFromTop%boardSize;
    if(section == 1 || section ==2){
        return 2*boardSize;
    }
    if(section == 3){
        depthInSection = boardSize -depthInSection;
    }
    
    return depthInSection*2;
    
}

function drawCircleAt(xFromCenter, yFromTop, centerX, centerY, boardRadius){
    var equilateralTriangleHeight = Math.sqrt(3)/2.0;    
    
	var rowCount = getRowCount();
    var columnCount = boardSize*2;
    var rowHeight = 2.0*boardRadius/rowCount;
    var columnWidth = equilateralTriangleHeight*boardRadius/columnCount;
    
    var xFudge = (2*columnWidth/3)*( pointsLeft(xFromCenter,yFromTop)+ 2.5);
    var yTop = centerY-(rowCount/2.0)*rowHeight;
    var resultY = yTop + yFromTop*rowHeight;
    var resultX = (xFromCenter -0.5)*2*columnWidth + centerX + xFudge;
	
	if((Math.abs(xFromCenter+yFromTop+0.5))%4<=0.5 && (Math.abs(xFromCenter-yFromTop+0.5))%3<=0.75){
		boardSet.push(paper.circle(resultX, resultY, columnWidth/2.0).attr({"fill":"rgba(255,255,155,1)"}));
	}else{
		boardSet.push(paper.circle(resultX, resultY, columnWidth/2.0).attr({"fill":"rgba(255,155,155,0.5)"}));
	}
}

document.body.onkeypress=function(e){if(e.charCode>=48&&e.charCode<=57)drawBoard(boardSize=e.charCode-48);};
window.onresize=function(){drawBoard();};