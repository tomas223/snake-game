/** @jsxImportSource @emotion/react */
import { Direction } from "@/types";
import { css } from "@emotion/react";
import { ReactNode } from "react";

type Props = {
  onTouchStart: () => void;
  children: ReactNode;
  name: Direction;
};

export const TouchKey = ({ onTouchStart, children, name }: Props) => {
  return (
    <button
      css={css`
        background-color: #ddd;
        border: none;
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        background-color: blue;
        font-size: large;
        :hover {
          background-color: red;
        }
        :active {
          background-color: "green";
        }
        grid-area: ${name};
      `}
      onTouchStart={onTouchStart}
    >
      {children}
    </button>
  );
};
