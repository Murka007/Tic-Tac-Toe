import React from "react";
import logo from "../img/logo.svg";
import { CSSTransition } from "react-transition-group";

function MainMenu({mainMenu, setMainMenu, setGame, mode, setMode}) {
    const classList1 = ["select-mode", "shadowed"];
    const classList2 = ["select-mode", "shadowed"];
    (!mode ? classList1 : classList2).push("mode-choosen");
    
    return (
        <CSSTransition
            in={mainMenu}
            timeout={{
                appear: 1000,
                enter: 500,
                exit: 500
            }}
            classNames="wrapper"
            appear={true}
            unmountOnExit={true}
            onExited={() => setGame(true)}
        >
        <div className="wrapper main-menu-wrapper">
            <div className="top-wrap">
                <div className="img-icon">
                    <img draggable={false} src={logo}/>
                </div>
                <h1 className="shadowed-bigger">Tic Tac Toe</h1>
            </div>
            <div className="bottom-wrap">
                <div className="button-wrap">
                    <button onClick={() => setMode(false)} className={classList1.join(" ")}>1 PLAYER</button>
                    <button onClick={() => setMode(true)} className={classList2.join(" ")}>2 PLAYERS</button>
                </div>
                <button onClick={() => setMainMenu(false)} className="play-game shadowed">PLAY</button>
            </div>
        </div>
        </CSSTransition>
    );
}
export default MainMenu;