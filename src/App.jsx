import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white h-12 w-12 border border-grey-500 leading-9 m-5 text-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xNext, setXnext] = useState(true);

  const winner = calculateWinner(square);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next: " + (xNext ? "X" : "O");
  }

  function handleClick(i) {
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquare = square.slice();
    if (xNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    setSquare(nextSquare);
    setXnext(!xNext);
  }
  return (
    <>
      <h1>{status}</h1>
      <div className="flex">
        <Square onSquareClick={() => handleClick(0)} value={square[0]} />
        <Square onSquareClick={() => handleClick(1)} value={square[1]} />
        <Square onSquareClick={() => handleClick(2)} value={square[2]} />
      </div>
      <div className="flex">
        <Square onSquareClick={() => handleClick(3)} value={square[3]} />
        <Square onSquareClick={() => handleClick(4)} value={square[4]} />
        <Square onSquareClick={() => handleClick(5)} value={square[5]} />
      </div>
      <div className="flex">
        <Square onSquareClick={() => handleClick(6)} value={square[6]} />
        <Square onSquareClick={() => handleClick(7)} value={square[7]} />
        <Square onSquareClick={() => handleClick(8)} value={square[8]} />
      </div>
    </>
  );
}

function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ((square[a] && square[a] === square[b], square[a] === square[c])) {
      return square[a];
    }
  }
  return null;
}