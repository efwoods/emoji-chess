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

const pieceNames = {
  p: "Black Pawn",
  r: "Black Rook",
  n: "Black Knight",
  b: "Black Bishop",
  q: "Black Queen",
  k: "Black King",
  P: "White Pawn",
  R: "White Rook",
  N: "White Knight",
  B: "White Bishop",
  Q: "White Queen",
  K: "White King",
};

const emojiOptions = [
  "♟️",
  "♜",
  "♞",
  "♝",
  "♛",
  "♚",
  "♙",
  "♖",
  "♘",
  "♗",
  "♕",
  "♔",
  "🐴",
  "🧙‍♂️",
  "🛡️",
  "🍄",
  "👑",
  "🐌",
  "🐜",
  "🐛",
  "🦗",
  "🌻",
  "🤪",
  "😝",
  "😻",
  "🫣",
  "😜",
  "😵‍💫",
  "🤩",
  "😊",
  "🥰",
  "😸",
  "🥴",
  "😆",
  "👽",
  "🏄",
  "🏄‍♂️",
  "🐰",
  "🐮",
  "🐷",
  "🐹",
  "🦁",
  "🦄",
  "🐁",
  "🐘",
  "🐇",
  "🐕",
  "🐖",
  "🐯",
  "🐺",
  "🐼",
  "🦁",
  "😨",
  "😖",
  "😯",
  "😏",
  "🤮",
  "🤢",
  "😵‍💫",
  "😵‍💫",
  "🥵",
  "🥶",
  "🤣",
  "😆",
  "😉",
  "😇",
  "😃",
  "😁",
  "😁",
  "🦸‍♂️",
  "🦸‍♀️",
  "🦹‍♀️",
  "🦹‍♂️",
  "🧌",
  "🧙‍♀️",
  "🧞‍♂️",
  "🧞‍♀️",
  "🧟",
  "🧟‍♂️",
  "🧟‍♀️",
  "🧝‍♂️",
  "🧝‍♀️",
];

export default function EmojiChess() {
  const [game, setGame] = useState(new Chess());
  const [pieces, setPieces] = useState(defaultPieces);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [playerWhite, setPlayerWhite] = useState("White Player");
  const [playerBlack, setPlayerBlack] = useState("Black Player");

  const handleEmojiChange = (piece, emoji) => {
    setPieces((prev) => ({ ...prev, [piece]: emoji }));
  };

  const handlePlayerNameChange = (player, name) => {
    if (player === "white") {
      setPlayerWhite(name);
    } else {
      setPlayerBlack(name);
    }
  };

  const handleSquareClick = (square) => {
    if (selected) {
      if (selected === square) {
        setMessage(`Deselected: ${square}`);
        setSelected(null);
        return;
      }

      const move = {
        from: selected,
        to: square,
        promotion: "q", // Default to queen for pawn promotion
      };

      const newGame = new Chess(game.fen());

      const legalMoves = newGame.moves({ verbose: true });
      const isMoveValid = legalMoves.some(
        (m) => m.from === move.from && m.to === move.to
      );

      if (isMoveValid) {
        setMessage(`Moved from ${selected} to ${square}`);
        newGame.move(move);
        setGame(newGame);
      } else {
        setMessage(`Invalid move: ${selected} → ${square}`);
      }

      setSelected(null);
    } else {
      const pieceAtSquare = game.get(square);
      if (pieceAtSquare) {
        console.log("color: ", pieceAtSquare.color);
        console.log("type: ", pieceAtSquare.type);
        console.log(pieceNames[pieceAtSquare.type]);
        if (pieceAtSquare.color === "w") {
          var pieceKey = pieceAtSquare.type.toUpperCase();
        } else {
          var pieceKey = pieceAtSquare.type;
        }

        const pieceType = pieceNames[pieceKey];
        setMessage(`Selected: ${pieceType} (${square})`);
      } else {
        setMessage(`Selected an empty square: ${square}`);
      }
      setSelected(square);
    }
  };

  const currentPlayer = game.turn() === "w" ? playerWhite : playerBlack;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <strong>
        <strong className="text-2xl font-bold mb-4 !important">
          Emoji Chess
        </strong>
      </strong>

      {/* Player Names and Current Turn */}
      <div className="flex justify-between w-full max-w-3xl mb-4">
        <div className="flex items-center space-x-2 w-full justify-start">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={playerWhite}
              onChange={(e) => handlePlayerNameChange("white", e.target.value)}
              className="border rounded px-2 py-1"
            />
            🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻
            {/* <div className="text-lg font-semibold">{playerWhite}</div> */}
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full justify-end">
          {/* <div className="text-lg font-semibold">{playerBlack}</div> */}
          <input
            type="text"
            value={playerBlack}
            onChange={(e) => handlePlayerNameChange("black", e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Current player's turn */}
      <div className="mb-2">
        <strong>Current Player: {currentPlayer}</strong>
      </div>

      {/* Selected piece info */}
      <div className="mb-4">
        {
          <div>
            <strong>{message}</strong>
          </div>
        }
      </div>

      {/* Chessboard */}
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
                {square
                  ? pieces[
                      square.color === "w"
                        ? square.type.toUpperCase()
                        : square.type
                    ]
                  : ""}
              </div>
            );
          })
        )}
      </div>

      {/* Emoji Dropdowns for pieces */}
      <div className="mt-6 flex flex-wrap gap-8 w-full max-w-3xl">
        {/* White Pieces Column */}
        <div className="flex flex-col items-start w-full md:w-1/2">
          <h2 className="font-medium mb-2">White Pieces</h2>
          {Object.keys(defaultPieces)
            .filter((piece) => piece === piece.toUpperCase()) // Only white pieces
            .map((piece) => (
              <div key={piece} className="flex flex-col items-start mb-2">
                <label className="mb-1 font-medium">
                  {pieces[piece]} {pieceNames[piece]}
                </label>
                <select
                  value={pieces[piece]}
                  onChange={(e) => handleEmojiChange(piece, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  {emojiOptions.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>
        {/* Empty Spacer Column */}
        <div className="flex flex-col items-start">
          🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻🐌🐜🐛🦗🌻
        </div>

        {/* Black Pieces Column */}
        <div className="flex flex-col items-start w-full md:w-1/2">
          <h2 className="font-medium mb-2"> Black Pieces</h2>
          {Object.keys(defaultPieces)
            .filter((piece) => piece === piece.toLowerCase()) // Only black pieces
            .map((piece) => (
              <div key={piece} className="flex flex-col items-start mb-2">
                <label className="mb-1 font-medium">
                  {pieces[piece]} {pieceNames[piece]}
                </label>
                <select
                  value={pieces[piece]}
                  onChange={(e) => handleEmojiChange(piece, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  {emojiOptions.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
