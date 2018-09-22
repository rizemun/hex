let canvas,
    ctx;

(function init(h,w){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.height = h;
    canvas.width = w;


    canvas.addEventListener("mousemove", function(e){
        cursor.x = e.clientX - canvas.offsetLeft;
        cursor.y = e.clientY - canvas.offsetTop;
    });

    canvas.addEventListener("mousedown",function(){
       console.log("mouse x = %i, mouse y = %i", cursor.x, cursor.y);
        for(let i=0; i<hexes.length; i++){
            if(hexes[i].isInside(cursor.x,cursor.y)){
                hexes[i].color = "lightslategrey";

            }
            else{
                hexes[i].color = false;
            }
        }

        for(let i=0; i<hexes.length; i++) {

            hexes[i].draw();
        }
    });

})(800,800);


let cursor = {
    x :0,
    y:0
};




let Hexagon = function(x,z,color){
    this.x = x;
    this.y = -x-z;
    this.z = z;
    this.color = color;
    this.defaultColor = color;
    this.type = "horizontal";
    this.size = 40;
    this.realX = canvas.width/2;
    this.realY = canvas.height/2 + this.z * this.size *2 ;

    this.realX += this.size * 1.5 * (this.x);
    this.realY -= this.size * (this.x);

    this.points=[   [this.realX-this.size/2,this.realY-this.size],
                    [this.realX+this.size/2,this.realY-this.size],
                    [this.realX+this.size,this.realY],
                    [this.realX+this.size/2,this.realY+this.size],
                    [this.realX-this.size/2,this.realY+this.size],
                    [this.realX-this.size,this.realY]   ];
    this.draw = function(){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.points[0][0],this.points[0][1]);
        for(let i=1;i<6;i++){
            ctx.lineTo(this.points[i][0],this.points[i][1]);
        }
        //ctx.lineTo(this.points[0][0],this.points[0][1]);
        ctx.closePath();
        if(this.color||this.defaultColor){
            if(this.color){
                ctx.fillStyle = this.color;
            }
            else{
                ctx.fillStyle = this.defaultColor;
            }

            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.strokeStyle = "purple";
        ctx.stroke();
        ctx.restore();
    };

    this.isSame = function(anotherHex){
        return ((this.realX === anotherHex.realX)&&(this.realY === anotherHex.realY));
    };
    this.isInside = function(x,y){
       /* if(   (x<=this.realX-this.size)||
            (x>=this.realX+this.size)||
            (y<=this.realY-this.size)||
            (y>=this.realY+this.size)) {
            console.log("outside of rectangle");

            return false;
        }*/
        let D = 0;
        for(let i = 0;i<5;i++){
            D =   (x - this.points[i][0]) *
                (this.points[i+1][1] - this.points[i][1]) -
                (y - this.points[i][1]) *
                (this.points[i+1][0] - this.points[i][0]);
            if(D>0) {
              /*
              console.log("outside of line i = %i, D= %i, x1=%i, y1=%i, x2=%i, y2=%i",i,D,this.points[i][0],this.points[i][1],this.points[i+1][0],this.points[i+1][1]);
              console.log("(%i - %i)*(%i - %i)-(%i - %i)*(%i - %i)",
                  x, this.points[i][0],
                  this.points[i+1][1], this.points[i][1],
                  y, this.points[i][1],
                  this.points[i+1][0], this.points[i][0]);
               */
              return false;
            }
        }
        D = (x - this.points[5][0]) *
            (this.points[0][1] - this.points[5][1]) -
            (y - this.points[5][1]) *
            (this.points[0][0] - this.points[5][0]);
        if(D>0){
            /*
            console.log("outside of line i = %i, D= %i, x1=%i, y1=%i, x2=%i, y2=%i",5,D,this.points[5][0],this.points[5][1],this.points[0][0],this.points[0][1]);
            console.log("(%i - %i)*(%i - %i)-(%i - %i)*(%i - %i)",
                x, this.points[5][0],
                this.points[0][1], this.points[5][1],
                y, this.points[5][1],
                this.points[0][0], this.points[5][0]);
            */
        }
        return !(D>0);

    };

};





let hexes = [];
let n = 8;
let m = 5;
for(let i=-m; i<m;i+=2){
    for(let j=i;j<i+n;j++) {
        hexes.push(new Hexagon(i, j+(-m-i)/2, "lightblue"));
        console.log("x=%i, z=%i",i,j);
        if((j!==i+n-1)&&(i!==m-2)) {
            hexes.push(new Hexagon(i+1, j+(-m-i+2)/2, "lightblue"));
        }
    }
}



for(let i=0; i<hexes.length;i++){
    hexes[i].realX+=100;
    hexes[i].draw();
}


let hex1 = new Hexagon(0,0,0,"black");
hex1.draw();
console.log("hex1.x = %i, hex1.y = %i",hex1.realX, hex1.realY);

hexes.push(hex1);



frame();










