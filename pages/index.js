import { useState } from "react";
import { useSpring, a } from "@react-spring/web";
const Level = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

const Card = ({ val }) => {
  const [flipped, isFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(700px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 1000, friction: 45 },
  });

  return (
    <div className="w-20 h-20 relative" onClick={() => isFlipped(!flipped)}>
      <a.div
        className="flex items-center justify-center bg-teal-300 text-black absolute w-full h-full"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        X
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
        {val}
      </a.div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex justify-center items-center p-5 min-h-screen">
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        {Level.map((i, index) => (
          <div className="w-20 h-20 " key={index}>
            <Card val={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
