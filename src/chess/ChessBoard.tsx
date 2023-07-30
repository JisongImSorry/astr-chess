import { Chessboard } from "react-chessboard";
import { Chess } from "chess.ts";
import { useState, useEffect, useRef } from "react";

export enum ChessEvent {
  CheckMate,
  Check,
  StaleMate,
  IllegalMove,
}

export const ChessBoard = (props: { event: Function }) => {
  const { event } = props;
  const [game, setGame] = useState(new Chess());
  const [clicked, setClicked] = useState(false);
  const [sourceSquare, setSourceSquare] = useState("");

  const [boardStyle, setBoardStyle] = useState({});

  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  const boardRef = useRef<any>();

  useEffect(() => {
    if (game.inCheckmate()) {
      event(ChessEvent.CheckMate);
    } else if (game.inCheck()) {
      event(ChessEvent.Check);
    } else if (game.inStalemate()) {
      event(ChessEvent.StaleMate);
    }
  }, [game, event]);

  function makeAMove(move: any) {
    let gameCopy = game.clone();
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare: any, targetSquare: any) {
    setOptionSquares({});
    setBoardStyle({});
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setSourceSquare("");
    const possibleMoves = game.moves();
    if (game.gameOver() || game.inDraw() || possibleMoves.length === 0) {
      console.log("Game over!");
      setGame(new Chess());
      return true;
    }

    // illegal move
    if (move === null) {
      event(ChessEvent.IllegalMove);
      return false;
    }

    return true;
  }

  const showMoveOptions = (square: any, moves: any) => {
    const newSquares = {} as any;
    moves.map((move: any) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to)?.color !== game.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
  };

  const onSquareClick = (square: any) => {
    const current = game.get(square);
    console.log(sourceSquare);
    if (sourceSquare === "") setSourceSquare(square);
    else {
      console.log(sourceSquare, square);
      makeAMove({
        from: sourceSquare,
        to: square,
        promotion: "q", // always promote to a queen for example simplicity
      });
      setSourceSquare("");
    }

    const moves = game.moves({ square: square, verbose: true });
    showMoveOptions(square, moves);
  };

  const onPieceDragBegin = (piece: any, square: any) => {
    const moves = game.moves({ square: square, verbose: true });
    showMoveOptions(square, moves);
  };

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onDrop}
      onSquareClick={onSquareClick}
      onPieceDragBegin={onPieceDragBegin}
      customBoardStyle={{
        borderRadius: "4px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        ...boardStyle,
      }}
      customSquareStyles={{
        ...moveSquares,
        ...optionSquares,
        ...rightClickedSquares,
      }}
      customPieces={{
        wP: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/wp.png"}
            alt="wP"
          />
        ),
        bP: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/bp.png"}
            alt="wP"
          />
        ),
        wQ: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/wq.png"}
            alt="wQ"
          />
        ),
        bQ: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/bq.png"}
            alt="wQ"
          />
        ),
        wK: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/wk.png"}
            alt="wK"
          />
        ),
        bK: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/bk.png"}
            alt="wK"
          />
        ),
        wN: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/wn.png"}
            alt="wN"
          />
        ),
        bN: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/bn.png"}
            alt="wN"
          />
        ),
        wR: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/wr.png"}
            alt="wR"
          />
        ),
        bR: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/br.png"}
            alt="bR"
          />
        ),
        wB: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/wb.png"}
            alt="wB"
          />
        ),
        bB: ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: squareWidth,
              opacity: isDragging ? 0.5 : 1,
              cursor: "grab",
            }}
            src={"/asset/bb.png"}
            alt="wB"
          />
        ),
      }}
      ref={boardRef}
    />
  );
};
