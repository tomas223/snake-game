import { useEffect, useRef } from "react";

export function useKeyboard(
  callback: (event: KeyboardEvent) => void,
  type: "keydown" | "keypress" | "keyup" = "keydown"
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    window.addEventListener(type, callbackRef.current);
    return () => window.removeEventListener(type, callbackRef.current);
  }, [type]);
}

// export function useArrowKeyboard:
type KeyboardKeyToValue<T> = { [key: string]: T };

export function useCustomKeyboard<T>(
  callback: (value: T) => void,
  keyToValue: KeyboardKeyToValue<T>
) {
  const keyboardCallback = (event: KeyboardEvent) => {
    const keys = Object.keys(keyToValue);
    if (keys.includes(event.key)) {
      const value = keyToValue[event.key];
      callback(value);
    }
  };

  useKeyboard(keyboardCallback, "keydown");
}
