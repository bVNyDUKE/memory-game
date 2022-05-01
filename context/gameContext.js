import * as React from "react";

// const generateLevel = () => {
//   let points = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
//   for (let i = points.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * i);
//     let k = points[i];
//     points[i] = points[j];
//     points[j] = k;
//   }
//   return points;
// };

const initialState = {
  level: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8],
  activeCard: null,
  previous: null,
  current: null,
  guessed: [],
};

function gameReducer(state, action) {
  switch (action.type) {
    case "setActiveCard": {
      return { ...state, activeCard: action.payload };
    }
    case "setCurrent": {
      const midState = {
        ...state,
        previous: state.current,
        current: action.payload,
      };
      if (midState.previous === midState.current) {
        const newState = {
          ...midState,
          guessed: [...midState.guessed, action.payload],
        };
        return newState;
      }
      return midState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const GameContext = React.createContext();

function GameProvider({ children }) {
  const [state, dispatch] = React.useReducer(gameReducer, initialState);
  const value = { state, dispatch };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGame() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { GameProvider, useGame };
