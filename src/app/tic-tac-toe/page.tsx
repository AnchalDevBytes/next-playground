"use client";
import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);

  const handleClick = (index : number) => {
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isNextX ? "X" : "O";
    setBoard(newBoard);

    setIsNextX(!isNextX);
  }

  const handleWinner = (board : any) => {
    const lists = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(const list of lists) {
      const [a,b,c] = list;

      if(board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  const winner = handleWinner(board);

  const handleReset = () => {
    setBoard(Array(9).fill(null));

    setIsNextX(true);
  }

  return (
    <div className="flex flex-col justify-center items-center p-20 gap-10">
      <h1 className="text-3xl font-black text-white/70">Tic Tac Toe</h1>

      Game Status : {winner ? `Winner is ${winner}` : `Next is ${isNextX ? "X" : "O"}`}

      <div className="grid grid-cols-3 gap-2">
        {
          board.map((value, index) => {
            return (
              <button
                key={index}
                className="h-12 w-12 border border-gray-300 bg-gray-400 rounded text-center"
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            )
          })
        }
      </div>

      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default TicTacToe;
