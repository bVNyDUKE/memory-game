import { useMemo, useEffect } from "react";
import { useGame } from "../context/gameContext";
import Card from "../components/Card";

export default function Home() {
  const {
    state: { guessed, level },
    dispatch,
  } = useGame();

  const won = useMemo(() => guessed.length === 8, [guessed]);

  useEffect(() => dispatch({ type: "reset" }), []);

  return (
    <div className="flex justify-center items-center p-5 min-h-screen">
      {won && (
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl text-emerald-700">Congrats!!</div>
          <button
            className="text-base"
            onClick={() => dispatch({ type: "reset" })}
          >
            Play again
          </button>
        </div>
      )}
      {!won && (
        <div className="grid grid-cols-4 grid-rows-4 gap-2">
          {level.map((cell) => (
            <div className="w-20 h-20" key={cell.id}>
              <Card val={cell.val} id={cell.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
