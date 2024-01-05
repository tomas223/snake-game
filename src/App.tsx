// App.tsx
import React, { useState, useEffect } from "react";
import { Snake, Food, Coordinate, Vector } from "./types";
import {
  randomCoordinate,
  collidesWithFood,
  collidesWithSelf,
  directionToVector,
} from "./utils";

const App: React.FC = () => {
  const [snake, setSnake] = useState<Snake>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Food>(randomCoordinate());
  const [direction, setDirection] = useState<Vector>(
    directionToVector("right")
  );
  // const [direction, setDirection] = useState<Direction>("right");

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        setDirection(directionToVector("up"));
        break;
      case "ArrowDown":
        setDirection(directionToVector("down"));
        break;
      case "ArrowLeft":
        setDirection(directionToVector("left"));
        break;
      case "ArrowRight":
        setDirection(directionToVector("right"));
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const game = setInterval(() => {
      const newSnake = [...snake];
      const newSnakeHead: Coordinate = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };
      newSnake.unshift(newSnakeHead);
      if (!collidesWithFood(newSnake, food)) {
        newSnake.pop();
      } else {
        setFood(randomCoordinate());
      }
      setSnake(newSnake);
      if (collidesWithSelf(newSnake)) {
        alert("Game Over");
        setSnake([{ x: 10, y: 10 }]);
        setDirection({ x: 2, y: 0 });
      }
    }, 200);
    return () => clearInterval(game);
  }, [snake, direction, food]);

  return (
    <div
      style={{
        position: "relative",
        height: "400px",
        width: "400px",
        border: "1px solid black",
      }}
    >
      {snake.map((part, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${part.y}%`,
            left: `${part.x}%`,
            height: "2%",
            width: "2%",
            backgroundColor: "green",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: `${food.y}%`,
          left: `${food.x}%`,
          height: "2%",
          width: "2%",
          backgroundColor: "red",
        }}
      />
    </div>
  );
};

export default App;
