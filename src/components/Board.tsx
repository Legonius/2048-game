import React, { useEffect, useState } from "react";
import useAllHooks from "../hooks/AllHooks";
import Restart from "./Restart";

type Props = {};

const Board = (props: Props) => {
  const { restart, handleArrowKey, numbers, isGameOver } = useAllHooks();

  useEffect(() => {
    restart();
    window.addEventListener("keyup", handleArrowKey);
    return () => window.removeEventListener("keyup", handleArrowKey);
  }, []);
  useEffect(() => {
    if (isGameOver) {
      console.log("Game Over");
    }
  }, [isGameOver]);
  if (!numbers) return <></>;
  return (
    <div className="game-panel">
      <div className="board">
        {numbers.map((arr) =>
          arr.map((x, index) => (
            <span key={index} className={`block ${"x" + (x <= 128 ? x : 128)}`}>
              {x > 0 ? x : ""}
            </span>
          ))
        )}
      </div>
      <Restart startingArray={restart} />
    </div>
  );
};

export default Board;
