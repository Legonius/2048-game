import React from "react";

type Props = { startingArray: () => void };

const Restart = (props: Props) => {
  return <button onClick={() => props.startingArray()}>Restart</button>;
};

export default Restart;
