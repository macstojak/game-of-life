let Piece = require("./Piece");
let _ = require("lodash");

module.exports = class Board{
    constructor(){
        this.extendedBoard = [
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
          ];
          this.activeBoard = [];
          this.previousBoard = [];
    }
  
    countPosition(coordinate, vector) {
        return coordinate + 1 * vector;
      }
    searchForBorderDiagonally(piece) {
          const borderDiagonal = piece.vectorsDiagonal.filter((v) => {
          let borderX = this.countPosition(piece.position.x, v.x);
          let borderY = this.countPosition(piece.position.y, v.y);
          let result;
          if((borderX>=0 && borderY>=0) && (borderX < this.previousBoard.length) && (borderY < this.previousBoard[0].length)){
              
            if(this.previousBoard[borderX][borderY].symbol==="X"){
                result=v;
                return result;
            }else{
                result=0;
            }
        }
              return result;
        });
        
        return borderDiagonal;
      }
      searchForBorderAxially(piece) {
        const borderAxial = piece.vectorsAxial.filter((v) => {
            let borderX = this.countPosition(piece.position.x, v.x);
            let borderY = this.countPosition(piece.position.y, v.y);
            let result;
            if((borderX>=0 && borderY>=0)&&(borderX<this.previousBoard.length && borderY<this.previousBoard[0].length)){
                if (this.previousBoard[borderX][borderY].symbol === "X") {
                result= v;
                }
            }
            return result;
          });
          return borderAxial;
      }

    checkTheRules(piece){
        let axialLength = this.searchForBorderAxially(piece).length;
        let diagonalLength = this.searchForBorderDiagonally(piece).length;
        let sum = axialLength+diagonalLength;
        let equalCondition = (sum===2 || sum===3);
        //martwa komórka ktora ma 3 żywych sąsiadów staje się żywa
        if(piece.life===false && sum===3){
            piece.live();
            this.activeBoard[piece.position.x].splice(piece.position.y,1,piece);
        }else if(equalCondition && piece.life===true ){
            piece.live();
            this.activeBoard[piece.position.x].splice(piece.position.y,1,piece);
        }else{
            piece.die();
            this.activeBoard[piece.position.x].splice(piece.position.y,1,piece);
        }
    }
  
    playTheGame(){
        this.setThePreviousBoard();
        this.activeBoard.forEach((r, indexI)=>{
            r.forEach((i, indexJ)=>{
                    this.checkTheRules(i);
            })
        })
    }
    
    getBoard(){
        return this.activeBoard;
    }
    placeThePiece(piece) {
        let { x, y } = piece.position;
        this.activeBoard[x][y] = piece;
    }
    setThePreviousBoard(){
        
        this.previousBoard = this.activeBoard.map(r=>r.map(i=>{
            return JSON.parse(JSON.stringify(i));
        }));
    }
    setThePieces(){
        let table = _.cloneDeep(this.extendedBoard);
        let tab = table.map((r,x)=>r.map((i,y)=>{
            let piece =new Piece({x:x,y:y});
            piece.die();
            return piece;
        }));
       
        this.activeBoard=_.cloneDeep(tab);
    }
    returnThePieces(){
        return this.activeBoard.filter(r=>{
            return r.filter(i=>{
            return (i.symbol==="X")?i:null;
            
        })})
    }
    
    }
    // let board = new Board();
    // let a=0;
    // board.setThePieces();
    // board.placeThePiece(new Piece({x:1,y:1}))
    // board.placeThePiece(new Piece({x:1,y:2}))
    // board.placeThePiece(new Piece({x:2,y:2}))
    // board.placeThePiece(new Piece({x:2,y:3}))

    // while(a<10){
    //     board.playTheGame();
    //     a++;
    // }
