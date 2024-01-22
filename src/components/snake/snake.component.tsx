/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
          key={index}
          style={{
            left: `${part.x * fieldSize}px`,
            top: `${part.y * fieldSize}px`,
            width: fieldSize + "px",
            height: fieldSize + "px",
          }}
          css={css`
            position: absolute;
            transition: left cubic-bezier(0.23, 1, 0.32, 1) 0.3s,
              top cubic-bezier(0.23, 1, 0.32, 1) 0.3s;
            border-radius: 20%;
            background-color: ${index === 0 ? "green" : "lightseagreen"};
          `}
        >
          
        </div>
      ))}
    </>
  );
};
