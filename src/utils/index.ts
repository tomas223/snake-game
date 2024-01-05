import type { Coordinate, Direction, Food, Snake, Vector } from "../types";

export const randomCoordinate = (): Coordinate => {
  const max = 20;
  const x = Math.floor((Math.random() * max) / 2) * 2;
  const y = Math.floor((Math.random() * max) / 2) * 2;
  return { x, y };
};

export const collidesWithFood = (snake: Snake, food: Food) =>
  snake[0].x === food.x && snake[0].y === food.y;

export const collidesWithSelf = (snake: Snake) =>
  snake.some(
    (part, index) =>
      index !== 0 && part.x === snake[0].x && part.y === snake[0].y
  );

export const directionToVector = (direction: Direction, step = 2): Vector => {
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
