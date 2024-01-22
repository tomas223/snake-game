/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Direction, SnakeCoordinates } from "../../types";
import { ReactNode } from "react";
import { TouchKey } from "../touch-key";

type Props = {
  onChange: (newDirection: Direction) => void;
};

export const TouchController = ({ onChange }: Props) => {
  // const handleTouch = (newDirection: Direction) => {
  //   onChange(newDirection);
  // };

  return (
    <div
      css={css`
        z-index: 999;
        display: grid;
        grid-template-areas:
          ". up ."
          "left down right";
      `}
    >
      <TouchKey name="up" onTouchStart={() => onChange("up")}>
        ↑
      </TouchKey>
      <TouchKey name="left" onTouchStart={() => onChange("left")}>
        ←
      </TouchKey>
      <TouchKey name="down" onTouchStart={() => onChange("down")}>
        ↓
      </TouchKey>
      <TouchKey name="right" onTouchStart={() => onChange("right")}>
        →
      </TouchKey>
    </div>
  );
};
