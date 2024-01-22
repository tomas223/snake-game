/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";

type Props = {
  isGameOver?: boolean;
  player1score?: number;
  onRestartGame?: () => void;
  children?: ReactNode;
};

export const SideBar = ({
  isGameOver,
  onRestartGame,
  player1score,
  children,
}: Props) => {
  return (
    <div style={{ border: "1px solid blue", padding: "1rem" }}>
      <h3>Score</h3>
      <p style={{ fontSize: "1.5rem" }}>{player1score}</p>
      {isGameOver ? (
        <p style={{ fontWeight: "bold", color: "red" }}>Game over</p>
      ) : (
        <p>Game: Running</p>
      )}
      <button onClick={onRestartGame}>Restart game</button>

      <div
        css={css`
          margin-top: 2rem;
        `}
      >
        {children}
      </div>
    </div>
  );
};

