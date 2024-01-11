import { ReactNode } from "react";
import type { Coordinate } from "../../types";

interface Props {
  boardSize: Coordinate;
  fieldSize: number;
  children: ReactNode;
}

export const GameBoard: React.FC<Props> = ({
  boardSize,
  fieldSize,
  children,
}) => {
  // const squareSizePx = fieldSize + "px";
  return (
    <div
      style={{
        position: "relative",
        width: `${boardSize.x * fieldSize}px`,
        height: `${boardSize.y * fieldSize}px`,
        border: "1px solid black",
      }}
    >
      {children}
    </div>
  );
};
