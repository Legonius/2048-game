import React from "react";
import Board from "./components/Board";
import { useGlobalState } from "./context/context";

type Props = {};

const App = (props: Props) => {
  const { score, moves, isGameOver } = useGlobalState();
  return (
    <div className="main">
      <h1>
        2048 Game <span>(Gabriele Cirulli)</span>
      </h1>
      <hr />
      {!isGameOver && (
        <h2>
          Score: <span>{score}</span>
        </h2>
      )}
      {isGameOver && (
        <p className="score-info">{`${score} points scored in ${moves} moves.`}</p>
      )}
      <Board />
    </div>
  );
};

export default App;
