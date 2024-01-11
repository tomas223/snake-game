import styles from "./snake.module.css";

import { SnakeCoordinates } from "../../types";

type Props = {
  coordinates: SnakeCoordinates;
  fieldSize: number;
};

export const Snake = ({ coordinates, fieldSize }: Props) => {
  return (
    <>
      {coordinates.map((part, index) => (
        <div
          className={styles.bodyCell}
          key={index}
          style={{
            // position: "absolute",
            left: `${part.x * fieldSize}px`,
            top: `${part.y * fieldSize}px`,
            width: fieldSize + "px",
            height: fieldSize + "px",
            backgroundColor: index === 0 ? "green" : "lightseagreen",
            // borderRadius: "20%", // Added for a "curved" look
            // transition: "left 0.3s, top 0.3s",
          }}
        />
      ))}
    </>
  );
};
