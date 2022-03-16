import React, {useState, useLayoutEffect} from "react";
import "./styles/App.css";
import Game from "./components/Game.jsx";
import MainMenu from "./components/MainMenu";

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
function getScale(val) {
  const [width, height] = val;
  return Math.min(width / 1920, height / 1080);
}
function App() {
  const val = useWindowSize();

  const [mainMenu, setMainMenu] = useState(true);
  const [game, setGame] = useState(false);
  const [mode, setMode] = useState(false);
  return (
    <div id="page-container" onContextMenu={(e) => e.preventDefault()} style={{transform: "translate(-50%, -50%) " + "scale("+getScale(val)+")"}}>
      <div className="page-wrapper">
        <MainMenu {...{mainMenu, setMainMenu, setGame, mode, setMode}}/>
        {game && (
          <Game {...{setMainMenu, setGame, mode}}/>
        )}
      </div>
    </div>
  );
}
export default App;