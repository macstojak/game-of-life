import React, { useState, useEffect, useRef } from "react";
import GameService from "../services/GameService";

const Board = () => {
  let [counter, setCounter] = useState(0);
  const countRef = useRef(counter);
  const inputRef = useRef();
  countRef.current = counter;
  let [activeBoard, setActiveBoard] = useState();
  let [boardClass, setBoardClass] = useState();
  let [tdElements, setTdElements] = useState([]);
  let [start, setStart] = useState(false);
  const tileStyle = {
    border: "2px solid red",
  };
  const xStyle = {
    fontWeight: 700,
    fontSize: "18px",
    color: "green",
    backgroundColor: "rgba(144, 238, 144,0.5)",
  };

  const normalStyle = {
    fontWeight: 400,
    fontSize: "12px",
    color: "black",
    backgroundColor: "white",
  };

  useEffect(() => {
    (async () => {
      let board = await GameService.returnTheBoard();
      board.setThePieces();
      setBoardClass(board);
      setActiveBoard(board.getBoard());
    })();
  }, []);

  const bringToLife = (x, y, item) => {
    let symbol = item.symbol || item;
    if (symbol === "0") {
      let piece = GameService.generateThePiece(x, y, true);
      boardClass.placeThePiece(piece);
      let b = boardClass.getBoard();
      let items = tdElements.filter(
        (i) => i.position.x !== x && i.position.y !== y
      );
      setTdElements([...items]);

      setActiveBoard(b);
    } else {
      let piece = GameService.generateThePiece(x, y, false);
      boardClass.placeThePiece(piece);
      let b = boardClass.getBoard();
      setTdElements([...tdElements, piece]);
      setActiveBoard(b);
    }
  };

  let play = () => {
    setStart(true);
    let iterations = parseInt(inputRef.current.value) - 1 || 9;
    let a = setInterval(() => {
      if (countRef.current < iterations) {
        boardClass.playTheGame();
        let b = boardClass.getBoard();
        setActiveBoard(b);
        setCounter(countRef.current + 1);
      } else {
        setStart(false);
        clearInterval(a);
        window.location.reload();
      }
    }, 1000);
  };

  return (
    <div>
      {start === true ? "" : <h2>mark the living cells and press start</h2>}
      {start === true ? (
        ""
      ) : (
        <span>
          <h2>set the number of iterations: </h2>
          <input type="text" autoFocus ref={inputRef}></input>
        </span>
      )}
      {start === true ? (
        <h2>{countRef.current + 1}</h2>
      ) : (
        <button onClick={() => play()} className="btn-start">
          <h2>Start</h2>
        </button>
      )}
      <table>
        <tbody>
          {!activeBoard ? (
            <tr></tr>
          ) : (
            activeBoard.map((row, i) => {
              return (
                <tr style={tileStyle} key={i}>
                  {row.map((item, j) => {
                    return (
                      <td
                        onClick={() => bringToLife(i, j, item)}
                        style={
                          item === "X" || item.symbol === "X"
                            ? xStyle
                            : normalStyle
                        }
                        key={j}
                      >
                        {item.symbol ? item.symbol : item === "X" ? "X" : "0"}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Board;
