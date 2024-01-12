/* eslint-disable react/prop-types */
import { useState } from "react";

/// feature: Creating the box's and interact with the boxes.
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

/// feature: desides the winner(calcualteWinner is at the end of the project), show which's turn is now to play
function Board({ xNext, square, onPlay }) {
  const winner = calculateWinner(square);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player " + (xNext ? "X" : "O");
  }

  /// feature: stop if X or O wins, pass the each step thorugh onPlay() mehtod to the uplifting state Game component.
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
    onPlay(nextSquare);
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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xNext, setXnext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquare = history[currentMove];

  function handlePlay(nextSquare) {
    setXnext(!xNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /// Jumping to the state if clicked in the history section.
  function jumpTo(move) {
    setCurrentMove(move);
    setXnext(move % 2 === 0);
  }

  /// managing the history by maping through history state.
  const move = history.map((history, move) => {
    let description;
    if (move > 0) {
      description = `Go to step #${move}`;
    } else {
      description = `Start the Game!`;
    }

    ///creating the histoy as list and adding a button to jump to that state
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  console.log(history);

  return (
    <>
      <div>
        {/* passing current box input, xNext to show which terms is now to play X or O, and onPlay() method handles each states. */}
        <Board square={currentSquare} xNext={xNext} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{move}</ol>
      </div>
    </>
  );
}

//calculate the winner based on box input
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
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}
