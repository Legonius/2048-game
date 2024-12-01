import { useEffect } from "react";
import useAllHooks from "../hooks/AllHooks";
import Restart from "./Restart";
import { useGlobalState } from "../context/context";

type Props = {};

const Board = (props: Props) => {
  const { restart, handleArrowKey, numbers } = useAllHooks();
  const { isGameOver } = useGlobalState();
  useEffect(() => {
    restart();
    window.addEventListener("keyup", handleArrowKey);
    return () => window.removeEventListener("keyup", handleArrowKey);
  }, []);

  if (!numbers) return <></>;
  return (
    <div className="game-panel">
      {isGameOver && <span className="game-over">Game Over</span>}
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
