import { useReducer } from "react";
import { Coordinate, Direction, Dimensions } from "../types";
import {
  collidesWithFoodIndex,
  directionToVector,
  randomCoordinate,
} from "../utils";

function areSameCoordinates(a: Coordinate, b: Coordinate): boolean {
  return a.x === b.x && a.y === b.y;
}

type PlayerState = { snake: Coordinate[]; direction: Direction };

type GameState = {
  player1: PlayerState;
  food: Coordinate[];
  board: Dimensions;
  fieldSize: number;
  gameTime: number;
  isCollision: boolean;
};

type GameStateSettings = Partial<Pick<GameState, "board">>;

// const DUMMY_SNAKE_1 = [{ x: 10, y: 10 }];
const DUMMY_SNAKE_3 = [
  { x: 8, y: 5 },
  { x: 7, y: 5 },
  { x: 6, y: 5 },
];

const DEFAULT_STATE: GameState = {
  player1: { snake: DUMMY_SNAKE_3, direction: "right" },
  food: [],
  board: { x: 50, y: 50 },
  fieldSize: 40,
  gameTime: 0,
  isCollision: false,
};

type Actions =
  | { type: "MOVE_GAME_FORWARD" }
  | { type: "ADD_FOOD"; payload: Coordinate }
  | { type: "CHANGE_SNAKE_1_DIRECTION"; payload: Direction }
  | { type: "RESET_GAME"; payload: GameStateSettings };

function gameStateReducer(state: GameState, action: Actions): GameState {
  switch (action.type) {
    case "MOVE_GAME_FORWARD": {
      const newSnake = [...state.player1.snake];
      let newFood = [...state.food];
      const directionVector = directionToVector(state.player1.direction, 1);

      const newSnakeHead: Coordinate = {
        x: newSnake[0].x + directionVector.x,
        y: newSnake[0].y + directionVector.y,
      };

      if (
        newSnakeHead.x < 0 ||
        newSnakeHead.x >= state.board.x ||
        newSnakeHead.y < 0 ||
        newSnakeHead.y >= state.board.y
      ) {
        return { ...state, isCollision: true };
      }

      if (
        state.player1.snake
          .slice(0, -1)
          .some((coord) => areSameCoordinates(coord, newSnakeHead))
      ) {
        return { ...state, isCollision: true };
      }

      newSnake.unshift(newSnakeHead);
      const headOnFoodIndex = collidesWithFoodIndex(newSnakeHead, state.food);
      if (headOnFoodIndex >= 0) {
        newFood = newFood.filter(
          (_, foodIndex) => foodIndex !== headOnFoodIndex
        );
        newFood.push(randomCoordinate(state.board));
      } else {
        newSnake.pop();
      }

      if (newFood.length === 0) {
        newFood.push(randomCoordinate(state.board));
      }

      return {
        ...state,
        food: newFood,
        gameTime: state.gameTime + 1,
        player1: { ...state.player1, snake: newSnake },
      };
    }
    case "ADD_FOOD":
      return {
        ...state,
        food: [...state.food, action.payload],
      };
    case "RESET_GAME":
      return {
        ...DEFAULT_STATE,
        ...action.payload,
      };
    case "CHANGE_SNAKE_1_DIRECTION": {
      const newDirection = action.payload;
      const directionVector = directionToVector(newDirection);
      const snake = state.player1.snake;
      const snakeHead = snake[0];
      const snakeNeck: Coordinate | undefined = snake[1];

      // potential snake head
      const newSnakeHead: Coordinate = {
        x: snakeHead.x + directionVector.x,
        y: snakeHead.y + directionVector.y,
      };

      if (snakeNeck && areSameCoordinates(snakeNeck, newSnakeHead)) {
        // don't allow snake to change direction backwards
        return state;
      }

      return {
        ...state,
        player1: { ...state.player1, direction: newDirection },
      };
    }
    default:
      return state;
  }
}

export function useCreateGameState(initialState?: GameStateSettings) {
  const gameReducer = useReducer(gameStateReducer, {
    ...DEFAULT_STATE,
    ...initialState,
  });

  return gameReducer;
}
