import * as React from "react";
import { makeGuess, generateLevel } from "../utils/gameUtils";

const initialState = {
  level: generateLevel(),
  activeCard: null,
  previousGuess: null,
  currentGuess: null,
  guessed: [],
};

function gameReducer(state, action) {
  switch (action.type) {
    case "setActiveCard": {
      return { ...state, activeCard: action.payload };
    }
    case "setCurrentGuess": {
      return {
        ...state,
        previousGuess: state.currentGuess,
        currentGuess: action.payload,
        guessed: makeGuess(state.guessed, state.currentGuess, action.payload),
      };
    }
    case "reset": {
      return {
        ...initialState,
        level: generateLevel(),
      };
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
