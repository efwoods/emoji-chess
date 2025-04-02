import React, { useState } from "react";
import { Chess } from "chess.js";

const defaultPieces = {
  p: "♟️",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
};

export default function EmojiChess() {
  const [game, setGame] = useState(new Chess());
  const [pieces, setPieces] = useState(defaultPieces);
  const [selected, setSelected] = useState(null);

  const handleSquareClick = (square) => {
    if (selected) {
      const move = { from: selected, to: square };
      const newGame = new Chess(game.fen());

      // ✅ Check if the move is legal before applying it
      const legalMoves = newGame
        .moves({ verbose: true })
        .map((m) => m.from + m.to);
      if (legalMoves.includes(selected + square)) {
        newGame.move({ from: selected, to: square });
        setGame(newGame);
      }
      setSelected(null);
    } else {
      setSelected(square);
    }
  };

  const selectEmoji = (piece) => {
    const newEmoji = prompt(`Enter emoji for ${piece}`);
    if (newEmoji) {
      setPieces((prevPieces) => ({ ...prevPieces, [piece]: newEmoji }));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Emoji Chess</h1>

      {/* ✅ Correct Grid Structure */}
      <div className="chessboard">
        {game.board().map((row, rowIndex) =>
          row.map((square, colIndex) => {
            const squareName = `${String.fromCharCode(97 + colIndex)}${
              8 - rowIndex
            }`;
            const isDark = (rowIndex + colIndex) % 2 === 1;
            return (
              <div
                key={squareName}
                className={`square ${isDark ? "dark" : "light"}`}
                onClick={() => handleSquareClick(squareName)}
              >
                {square ? pieces[square.type] : ""}
              </div>
            );
          })
        )}
      </div>

      {/* Piece Selector */}
      <div className="mt-4 flex gap-2">
        {Object.keys(defaultPieces).map((piece) => (
          <button
            key={piece}
            className="px-3 py-1 border rounded bg-blue-500 text-white"
            onClick={() => selectEmoji(piece)}
          >
            {pieces[piece]}
          </button>
        ))}
      </div>
    </div>
  );
}
