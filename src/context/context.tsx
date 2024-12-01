import { createContext, ReactNode, useContext, useState } from "react";

type Tcontext = {
  score: number;
  isGameOver: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
};
type Props = { children: ReactNode };
const globalContext = createContext<Tcontext>({
  score: 0,
  moves: 0,
  setMoves: () => {},
  isGameOver: false,
  setScore: () => {},
  setIsGameOver: () => {},
});

const ContextProviderWrapper = ({ children }: Props) => {
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);
  return (
    <globalContext.Provider
      value={{
        score: totalScore,
        isGameOver: gameOver,
        setScore: setTotalScore,
        setIsGameOver: setGameOver,
        moves,
        setMoves,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
export const useGlobalState = () => useContext(globalContext);

export default ContextProviderWrapper;
