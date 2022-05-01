import "../styles/globals.css";
import { GameProvider } from "../context/gameContext";

function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}

export default MyApp;
