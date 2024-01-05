import React from 'react';

const Board = ({board}) => {
  return (
    <div>
      {board.map((row, y) => (
        <div key={y}>
          {row.map((cell, x) => (
            <div
              key={x}
              className={
                cell === 'S' ? 'snake' : cell === 'A' ? 'apple' : 'cell'
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;