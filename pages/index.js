import { useSpring, a } from "@react-spring/web";
import { useState, useEffect } from "react";
import { useGame } from "../context/gameContext";

const Card = ({ val, id }) => {
  const { state, dispatch } = useGame();
  const [flipped, setFlipped] = useState(false);
  const [guessed, setGuessed] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (state.guessed.includes(val)) {
      setGuessed(true);
      setFlipped(true);
    }
  });

  useEffect(() => {
    if (state.activeCard !== id) {
      setFlipped(false);
    }
  }, [state.activeCard, id]);

  const clickHandle = () => {
    if (!guessed) {
      setFlipped(!flipped);
      if (state.activeCard !== id) {
        dispatch({ type: "setActiveCard", payload: id });
        dispatch({ type: "setCurrentGuess", payload: val });
      }
    }
  };

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 1000, friction: 45 },
  });

  return (
    <div className="w-20 h-20 relative" onClick={clickHandle}>
      <a.div
        className="flex items-center justify-center bg-slate-400 text-black absolute w-full h-full"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <span>X</span>
      </a.div>
      <a.div
        className="flex items-center w-full h-full border border-gray-300 justify-center absolute"
        style={{
          opacity,
          transform,
          rotateX: "180deg",
          rotateY: "180deg",
        }}
      >
        <span>{val}</span>
      </a.div>
    </div>
  );
};

export default function Home() {
  const { state } = useGame();

  return (
    <div className="flex justify-center items-center p-5 min-h-screen">
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        {state.level.map((cell) => (
          <div className="w-20 h-20" key={cell.id}>
            <Card val={cell.val} id={cell.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
