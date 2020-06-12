import React, {useState, useEffect, useRef} from "react";
import GameService from "../services/GameService";

const Board = () =>{
    let [counter, setCounter] = useState(0);
    const countRef = useRef(counter);
    const inputRef = useRef();
    countRef.current = counter;
    let [activeBoard, setActiveBoard] = useState();
    let [boardClass, setBoardClass] = useState();
    let [tdValue, setTdValue] = useState(0);
    let [piecesTable, setPiecesTable] = useState([]);
    let [start, setStart] = useState(false);
    const tileStyle={
        border: "2px solid red"
    }
    const xStyle={
        fontWeight: 700,
        fontSize: "18px",
        color: "green",
        backgroundColor: "rgba(144, 238, 144,0.5)"
    }

    const normalStyle={
        fontWeight: 400,
        fontSize: "12px",
        color:"black",
        backgroundColor: "white"
    }
 
   
    const bringToLife = (x,y) =>{
        if(tdValue===0){
            let piece = GameService.generateThePiece(x,y, true);
           
            setPiecesTable([...piecesTable, piecesTable]);
          
            boardClass.placeThePiece(piece);
            setActiveBoard(boardClass.getBoard());
        }else{
            let piece = GameService.generateThePiece(x,y, false);
           
            setPiecesTable([...piecesTable, piecesTable]);
          
            boardClass.placeThePiece(piece);
            setActiveBoard(boardClass.getBoard());
        }
      
    }
   
   useEffect(() =>{
       ( async ()=>{
        
        let board = await GameService.returnTheBoard();
        board.setThePieces();
        setBoardClass(board)
        setActiveBoard(board.getBoard());
       })()
    
   }, []);

  


   let play=()=>{
       setStart(true);
       let iterations = parseInt(inputRef.current.value)-1 || 9;
       let a = setInterval(()=>{
           if(countRef.current<iterations){

            boardClass.playTheGame();
            let b=boardClass.getBoard();
            setActiveBoard(b);
            
            setCounter(countRef.current+1);
            console.log(countRef.current);
           }else{
               setStart(false);
               clearInterval(a);
               window.location.reload();
           }
           
       }, 1000)
   
   }

    return(
        <div>
        {start===true?"":<h2>mark the living cells and press start</h2>}
        {start===true?"": <span><h2>set the number of iterations: </h2><input id="inputIt" type="text" autoFocus ref={inputRef}></input></span>}
        {start===true?<h2>{countRef.current+1}</h2>:<button onClick={()=>play()} className="btn-start"><h2>Start</h2></button>}
        <table>
            <tbody>
            {!activeBoard?<tr></tr>:activeBoard.map((row, i)=>{
                return(
                <tr style={tileStyle} key={i}>
                    {row.map((item, j)=>{
                        return(
                            <td onClick={()=>bringToLife(i, j)}  
                                style={item==="X"||item.symbol==="X" ? xStyle:normalStyle } key={j} >
                                {item.symbol?item.symbol:(item==="X"?"X":"0")}
                            </td>
                        )
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
        </div>
    )
}
export default Board;