import React from "react";
import Board from "./components/Board";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="main">
      <h1>2048 Game</h1>
      <hr />
      <h2>
        Score: <span>0</span>
      </h2>
      <Board />
    </div>
  );
};

export default App;
