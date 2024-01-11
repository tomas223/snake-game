// App.tsx
import React, { useEffect } from "react";
// import { handleKeyPress } from "../../utils/game-logic.utils";
import { useCreateGameState } from "../../stores";
import { GameBoard } from "../game-board";
import { Snake } from "../snake/snake.component";
import { Food } from "../food";
import { useInterval } from "usehooks-ts";

const GAME_SPEED_MS = 300;

export const Game: React.FC = () => {
  const [gameState, updateGameState] = useCreateGameState({
    board: { x: 20, y: 20 },
  });
  const { board, food, player1, fieldSize } = gameState;

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          updateGameState({ type: "CHANGE_SNAKE_1_DIRECTION", payload: "up" });
          break;
        case "ArrowDown":
          updateGameState({
            type: "CHANGE_SNAKE_1_DIRECTION",
            payload: "down",
          });
          break;
        case "ArrowLeft":
          updateGameState({
            type: "CHANGE_SNAKE_1_DIRECTION",
            payload: "left",
          });
          break;
        case "ArrowRight":
          updateGameState({
            type: "CHANGE_SNAKE_1_DIRECTION",
            payload: "right",
          });
          break;
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, [updateGameState]);

  useInterval(
    () => {
      updateGameState({ type: "MOVE_GAME_FORWARD" });
    },
    gameState.isCollision ? null : GAME_SPEED_MS
  );
;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <GameBoard boardSize={board} fieldSize={fieldSize}>
        <Snake coordinates={player1.snake} fieldSize={fieldSize} />
        <Food coordinates={food} fieldSize={fieldSize} />
      </GameBoard>
      <div style={{ border: "1px solid blue", padding: "1rem" }}>
        <h3>Score</h3>
        <p style={{ fontSize: "1.5rem" }}>{player1.snake.length - 1}</p>
        {gameState.isCollision ? (
          <p style={{ fontWeight: "bold", color: "red" }}>Game over</p>
        ) : (
          <p>Game: Running</p>
        )}
        {/* <button>Restart</button> */}
      </div>
    </div>
  );
};
