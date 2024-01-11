import styles from "./food.module.css";

import { Coordinate } from "../../types";

type Props = {
  coordinates: Coordinate[];
  fieldSize: number;
};

export const Food = ({ coordinates, fieldSize }: Props) => {
  // console.log("coordinates - food", coordinates);

  return (
    <>
      {coordinates.map((part, index) => (
        <div
          className={styles.foodItem}
          key={index}
          style={{
            // position: "absolute",
            left: `${part.x * fieldSize}px`,
            top: `${part.y * fieldSize}px`,
            height: fieldSize + "px",
            width: fieldSize + "px",
            // backgroundColor: "red",
            // borderRadius: "50%", // Added for a "curved" look
          }}
        >
          {/* 🍎 */}
        </div>
      ))}
    </>
  );
};

// 🧡
