import React from "react";
import Board from "../classes/Board";
import Piece from "../classes/Piece";

export default class GameService extends React.Component{
    
    static returnTheBoard(){
        let board = new Board();
        return board;
    }
    static generateThePiece(x,y,life){
        let p = {x,y};
        let piece = new Piece(p, life);
        return piece;
    }
   
    
} 