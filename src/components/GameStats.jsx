import React from "react";
import cross from "../img/cross1.svg";
import zero from "../img/zero1.svg";
import draw from "../img/draw.svg";

function GameStats({crossScore, drawScore, zeroScore}) {
    return (
        <div className="score-wrap">
            <div className="img-icon p-10">
                <img draggable={false} src={cross}/>
            </div>
            <div className="img-icon p-10">
                <img draggable={false} src={draw}/>
            </div>
            <div className="img-icon p-10">
                <img draggable={false} src={zero}/>
            </div>
            <div className="score-value shadowed">{crossScore}</div>
            <div className="score-value shadowed">{drawScore}</div>
            <div className="score-value shadowed">{zeroScore}</div>
        </div>
    );
}
export default GameStats;