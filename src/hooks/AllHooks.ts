import { useState } from "react";
import useHelperHooks from "./HelperHooks";
import { useGlobalState } from "../context/context";

type AllHooks = () => {
  restart: () => void;
  handleArrowKey: (ev: KeyboardEvent) => void;
  numbers: number[][];
};

export default function useAllHooks(): ReturnType<AllHooks> {
  const { setIsGameOver, setScore } = useGlobalState();
  const [numbers, setNumbers] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const {
    movingDown,
    movingLeft,
    movingRight,
    movingUp,
    randomPopup,
    checkGameOver,
  } = useHelperHooks({
    numbers,
    setNumbers,
  });

  // random number for starting array
  const restart = () => {
    setScore(0);
    const count = 2;
    const initialNumber = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    for (let i = 0; i < count; i++) {
      const random1 = Math.floor(Math.random() * 4);
      const random = Math.floor(Math.random() * 4);

      if (initialNumber[random1][random] === 0) {
        initialNumber[random1][random] = 2;
      } else {
        i--;
      }
    }
    setNumbers(initialNumber);
    setIsGameOver(false);
  };

  // handling arrow key
  const handleArrowKey = (ev: KeyboardEvent) => {
    if (ev.code === "ArrowLeft") {
      movingLeft();
    } else if (ev.code === "ArrowRight") {
      movingRight();
    } else if (ev.code === "ArrowUp") {
      movingUp();
    } else if (ev.code === "ArrowDown") {
      movingDown();
    }
    setNumbers((prev) => {
      randomPopup(prev);
      let gameOver = checkGameOver(prev);
      if (gameOver) {
        setIsGameOver(true);
      }
      return prev;
    });
  };

  return { restart, handleArrowKey, numbers };
}
