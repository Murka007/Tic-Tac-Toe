import React from "react";
import cross from "../img/cross1.svg";
import zero from "../img/zero1.svg";
import draw from "../img/draw.svg";
import { isSolved } from "../utils/board";

function GameTitle({board, currentTurn}) {
    const solved = isSolved(board);
    let condition = cross;
    if (solved === 2) {
        condition = zero;
    } else if (solved === 1) {
        condition = cross;
    } else if (solved === -1) {
        condition = draw;
    } else if (currentTurn) {
        condition = zero;
    }

    return (
        <div className="game-header">
            <div className="game-header-wrapper">
                <div className="img-icon img-smaller">
                    <img draggable={false} src={condition}/>
                </div>
                <h1 className="shadowed">{solved > 0 ? "WON" : solved === -1 ? "DRAW" : "TURN"}</h1>
            </div>
        </div>
    );
}
export default GameTitle;