module.exports = class Piece{
    constructor(position, life){
        this.position = position;
        this.symbol = (life===true?"X":"0");
        this.life=life;
        this.vectorsAxial=[{x:-1,y:-1}, {x:-1, y:1}, {x:1, y:1}, {x: 1, y:-1}];
        this.vectorsDiagonal=[{x:1, y:0}, {x:-1, y:0}, {x:0,y:-1}, {x:0, y:1}];
    }
  
    getPosition(){
        return this.position;
    }
    live(){
        this.life=true;
        this.symbol="X";
    }
    die(){
        this.life=false;
        this.symbol="0";
    }
  
   
}