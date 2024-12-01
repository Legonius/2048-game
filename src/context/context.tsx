import { createContext, ReactNode, useContext, useState } from "react";

type Tcontext = {
  score: number;
  isGameOver: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};
type Props = { children: ReactNode };
const globalContext = createContext<Tcontext>({
  score: 0,
  isGameOver: false,
  setScore: () => {},
  setIsGameOver: () => {},
});

const ContextProviderWrapper = ({ children }: Props) => {
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  return (
    <globalContext.Provider
      value={{
        score: totalScore,
        isGameOver: gameOver,
        setScore: setTotalScore,
        setIsGameOver: setGameOver,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
export const useGlobalState = () => useContext(globalContext);

export default ContextProviderWrapper;
