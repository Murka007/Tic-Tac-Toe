import React from "react";
import { isSolved } from "../utils/board";

function Cell({row, index, mode, winIndexes, board, setBoard, currentTurn, setCurrentTurn}) {
    const solved = isSolved(board);
    function isWinner() {
        return winIndexes.find(([line, i]) => line === row && i === index);
    }
    function isSet() {
        return board[row][index];
    }
    const classList = ["cell", "scale"];
    const set = isSet();
    if (set || solved > 0) {
        classList.splice(1, 1);
        if (set === 1) classList.push("cross");
        if (set === 2) classList.push("zero");
    }
    if (isWinner()) {
        classList.push("opacityTr");
    }
    if (!mode && currentTurn && solved === 0) {
        classList.push("disable-move");
    }
    function checkToggle() {
        setCurrentTurn(!currentTurn);
        board[row][index] = Number(currentTurn)+1;
        setBoard(board);
    }
    return (
        <div onClick={solved !== 0 || isSet() || !mode && currentTurn ? null : () => checkToggle()} className={classList.join(" ")}></div>
    );
}
export default Cell;