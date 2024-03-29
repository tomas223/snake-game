export type Direction = "up" | "down" | "left" | "right";

export type Coordinate = { x: number; y: number };

export type Vector = Coordinate;
export type Dimensions = Coordinate;

export type SnakeCoordinates = Coordinate[];

// export type Food = Coordinate;

// export type GameState = {
//   snake: SnakeCell[];
//   direction: Direction;
//   food: SnakeCell;
//   gameOver: boolean;
//   score: number;
// };
