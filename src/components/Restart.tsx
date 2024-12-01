import React from "react";
import { useGlobalState } from "../context/context";

type Props = { startingArray: () => void };

const Restart = (props: Props) => {
  const { isGameOver } = useGlobalState();

  return (
    <button
      className={isGameOver ? "new-game" : "restart"}
      onClick={() => props.startingArray()}
    >
      {isGameOver ? "NewGame" : "Restart"}
    </button>
  );
};

export default Restart;
