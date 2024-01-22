/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Direction, SnakeCoordinates } from "../../types";

type Props = {
  onChange: (newDirection: Direction) => void;
};

export const TouchController = ({ onChange }: Props) => {
  const handleTouch = (newDirection: Direction) => {
    onChange(newDirection);
  };

  return (
    <div
      css={css`
        position: absolute;
        right: 5vw;
        bottom: 5vh;
        z-index: 999;
        width: 200px;
        height: 200px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      `}
    >
      <button
        css={css`
          background-color: #ddd;
          border: none;
          height: 40px;
          width: 40px;
        `}
        onTouchStart={() => handleTouch("up")}
      />
      <button
        className="arrow right"
        onTouchStart={() => handleTouch("right")}
      />
      <button className="arrow down" onTouchStart={() => handleTouch("down")} />
      <button className="arrow left" onTouchStart={() => handleTouch("left")} />
    </div>
  );
};
