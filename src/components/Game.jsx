import React, {useEffect, useState} from "react";
import Cell from "./Cell.jsx";
import GameTitle from "./GameTitle.jsx";
import { CSSTransition } from "react-transition-group";
import GameStats from "./GameStats.jsx";
import { isSolved, getEmptyCells, getWinIndexes } from "../utils/board.js";
import { rand } from "../utils/rand.js";


function Game({setMainMenu, setGame, mode}) {
    const [currentTurn, setCurrentTurn] = useState(false);
    const [turn, setTurn] = useState(false);
    const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    const [wonGame, setWonGame] = useState(false);
    const [crossScore, setCrossScore] = useState(0);
    const [drawScore, setDrawScore] = useState(0);
    const [zeroScore, setZeroScore] = useState(0);
    const [newGame, setNewGame] = useState(false);

    const winLimit = 3;
    const solved = isSolved(board);

    useEffect(() => {
        if (!mode && currentTurn && solved === 0) {
            const cells = getEmptyCells(board);
            if (cells.length) {
                setTimeout(() => {
                    const [row, index] = cells[rand(0, cells.length-1)];
                    board[row][index] = Number(currentTurn)+1;
                    setBoard(board);
                    setCurrentTurn(!currentTurn);
                }, rand(700, 1200));
            }
        }
    })

    function resetGame() {
        setWonGame(false);
        setTurn(!turn);
        setCurrentTurn(!turn);
        setBoard([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    }

    const winIndexes = solved && wonGame ? getWinIndexes(board) : [];

    if (solved && !wonGame) {
        setWonGame(true);
        if (solved === 1) {
            setCrossScore(crossScore+1);
        } else if (solved === 2) {
            setZeroScore(zeroScore+1);
        } else if (solved === -1) {
            setDrawScore(drawScore+1);
        }
    }

    // Generate cells
    const Cells = [];
    for (let row=0,count=0;row<3;row++) {
        for (let index=0;index<3;index++) {
            Cells.push(<Cell key={count++} {...{row, index, mode, winIndexes, board, setBoard, currentTurn, setCurrentTurn}}/>);
        }
    }
    function updateState() {
        setGame(false);
        setMainMenu(true);
    }
    return (
        <CSSTransition
            in={!newGame}
            classNames="wrapper"
            timeout={500}
            unmountOnExit={true}
            appear={true}
            onExited={() => updateState()}
        >
            <div className="wrapper">
                <GameTitle {...{board, currentTurn}}/>
                <GameStats {...{crossScore, drawScore, zeroScore}}/>

                <div onClick={isSolved(board) !== 0 && crossScore < winLimit && zeroScore < winLimit ? () => resetGame() : null} className="game-wrapper">
                    <div className="game-container">
                        {Cells}
                    </div>
                    {(crossScore >= winLimit || zeroScore >= winLimit) && (
                        <CSSTransition
                            in={true}
                            classNames="new-game-container"
                            timeout={1000}
                            appear={true}
                        >
                            <div onClick={() => setNewGame(true)} className="new-game-container shadowed-bigger">NEW GAME?</div>
                        </CSSTransition>
                    )}
                </div>
            </div>
        </CSSTransition>
    );
}
export default Game;