import type {
  Coordinate,
  Direction,
  Dimensions,
  Vector,
  SnakeCoordinates,
} from "../types";

export const randomCoordinate = (
  boardSize: Dimensions = { x: 20, y: 20 }
): Coordinate => {
  const x = Math.floor(Math.random() * boardSize.x);
  const y = Math.floor(Math.random() * boardSize.y);
  return { x, y };
};

export const collidesWithFoodIndex = (
  snakeHead: Coordinate,
  food: Coordinate[]
) => food.findIndex((food) => food.x === snakeHead.x && food.y === snakeHead.y);

export const collidesWithSelf = (snake: SnakeCoordinates) =>
  snake.some(
    (part, index) =>
      index !== 0 && part.x === snake[0].x && part.y === snake[0].y
  );

export const directionToVector = (direction: Direction, step = 1): Vector => {
  switch (direction) {
    case "up":
      return { x: 0, y: -step };
    case "down":
      return { x: 0, y: step };
    case "left":
      return { x: -step, y: 0 };
    case "right":
      return { x: step, y: 0 };
  }
};
