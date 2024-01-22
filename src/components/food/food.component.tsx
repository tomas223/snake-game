/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Coordinate } from "../../types";

type Props = {
  coordinates: Coordinate[];
  fieldSize: number;
};

export const Food = ({ coordinates, fieldSize }: Props) => {
  const size = fieldSize + "px";

  return (
    <>
      {coordinates.map((part) => (
        <div
          key={`${part.x}_${part.y}`}
          style={{
            left: `${part.x * fieldSize}px`,
            top: `${part.y * fieldSize}px`,
          }}
          css={css`
            position: absolute;
            line-height: ${size};
            font-size: ${size};
          `}
        >
          🍎
        </div>
      ))}
    </>
  );
};

// 🧡
