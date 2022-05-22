import { useState, useCallback, useEffect } from "react";
import { useGame } from "../context/gameContext";
import Card from "../components/Card";

export default function Home() {
  const { state, dispatch } = useGame();
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (state.guessed.length === 8) {
      setWon(() => true);
    }
  }, [state.guessed]);

  const playAgain = useCallback(() => {
    dispatch({ type: "reset" });
    setWon(false);
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center p-5 min-h-screen">
      {won && (
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl text-emerald-700">Congrats!!</div>
          <button className="text-base" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
      {!won && (
        <div className="grid grid-cols-4 grid-rows-4 gap-2">
          {state.level.map((cell) => (
            <div className="w-20 h-20" key={cell.id}>
              <Card val={cell.val} id={cell.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
