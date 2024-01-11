import type { Coordinate } from "../types";

export const handleKeyPress = (
  event: KeyboardEvent,
  setDirection: (c: Coordinate) => void
) => {
  switch (event.key) {
    case "ArrowUp":
      setDirection({ x: 0, y: -1 });
      break;
    case "ArrowDown":
      setDirection({ x: 0, y: 1 });
      break;
    case "ArrowLeft":
      setDirection({ x: -1, y: 0 });
      break;
    case "ArrowRight":
      setDirection({ x: 1, y: 0 });
      break;
  }
};
