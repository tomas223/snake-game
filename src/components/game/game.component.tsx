/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
// import { handleKeyPress } from "../../utils/game-logic.utils";
import { useCreateGameState } from "../../stores";
import { GameBoard } from "../game-board";
import { Snake } from "../snake/snake.component";
import { Food } from "../food";
import { useInterval } from "usehooks-ts";
import { css } from "@emotion/react";
import { TouchController } from "../touch-controller";
import { useCustomKeyboard } from "../../hooks";
import { SideBar } from "../side-bar";
import { Direction } from "@/types";

const GAME_SPEED_MS = 300;
const BOARD = { x: 20, y: 20 };

export const Game: React.FC = () => {
  const [gameState, updateGameState] = useCreateGameState({
    board: BOARD,
  });
  const { board, food, player1, fieldSize } = gameState;

  useInterval(
    () => {
      updateGameState({ type: "MOVE_GAME_FORWARD" });
    },
    gameState.isCollision ? null : GAME_SPEED_MS
  );

  const handleOnDirection = (newDirection: Direction) => {
    updateGameState({
      type: "CHANGE_SNAKE_1_DIRECTION",
      payload: newDirection,
    });
  };

  useCustomKeyboard(handleOnDirection, {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  } as const);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <GameBoard boardSize={board} fieldSize={fieldSize}>
        <Snake coordinates={player1.snake} fieldSize={fieldSize} />
        <Food coordinates={food} fieldSize={fieldSize} />
      </GameBoard>
      <SideBar
        isGameOver={gameState.isCollision}
        onRestartGame={() =>
          updateGameState({ type: "RESET_GAME", payload: { board: BOARD } })
        }
        player1score={player1.snake.length - 1}
      >
        <TouchController onChange={handleOnDirection} />
      </SideBar>
    </div>
  );
};
