import React, { useState } from "react";
import styled from "styled-components";

import { uncoverBlock, flagBlock, setupBoard } from "../utils";
import { BlockType, BlockValue, Bomb } from "../types";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import StatusBar from "./StatusBar";
import Board from "./Board";

const MiddleOfScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  margin-top: 0px;
  margin-bottom: 0.5em;
`;

const RestartButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  background-color: aquamarine;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: hsl(160, 100%, 86%);
  }
`;

const Game = () => {
  const {
    isShowing,
    showModal,
    clearModal,
    modalMessage,
    modalBackground,
  } = useModal();
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const endGame = (won: boolean) => {
    if (won) {
      setWinCount(winCount + 1);
      showModal("You got them all! You win!", true);
    } else {
      setLossCount(lossCount + 1);
      showModal("BOOM!", false);
    }
  };

  const [size] = useState({ width: 10, height: 10 });
  const [bombCount] = useState(
    Math.floor(size.width * size.height * 0.2) // 20% of board is bombs
  );
  const [bombs, setBombs] = useState<Bomb[]>([]);
  const [board, setBoard] = useState<BlockType[][]>(() => {
    const { initialBoard, bombs } = setupBoard(
      size.width,
      size.height,
      bombCount
    );
    setBombs(bombs);
    return initialBoard;
  });

  const [flagsLeft, setFlagsLeft] = useState(bombCount);

  const restartGame = () => {
    const { initialBoard, bombs } = setupBoard(
      size.width,
      size.height,
      bombCount
    );
    clearModal();
    setBombs(bombs);
    setFlagsLeft(bombCount);
    setBoard(initialBoard);
  };

  const handleClick = (e: React.MouseEvent, block: BlockType) => {
    const { board: newBoard, recoveredFlags } = uncoverBlock(board, block);
    setBoard(newBoard);
    setFlagsLeft(flagsLeft + recoveredFlags);
    if (block.value === BlockValue.BOMB) {
      endGame(false);
    }
  };

  const handleRightClick = (e: React.MouseEvent, block: BlockType) => {
    e.preventDefault();
    const alreadyFlagged = block.flagged;
    if (!alreadyFlagged && flagsLeft === 0) {
      console.log("No more flags!");
      return;
    }
    setFlagsLeft(flagsLeft + (alreadyFlagged ? 1 : -1));
    setBoard((boardState) => {
      // right click
      return flagBlock(boardState, block);
    });
    const newBombs = bombs.map((bomb) => {
      if (
        block.position.row === bomb.position.row &&
        block.position.col === bomb.position.col
      ) {
        return { ...bomb, flagged: !bomb.flagged };
      }
      return bomb;
    });
    if (
      newBombs.reduce(
        (allFlagged, current) => allFlagged && current.flagged,
        newBombs[0].flagged
      )
    ) {
      endGame(true);
    }
    setBombs(newBombs);
  };

  return (
    <MiddleOfScreen>
      <Modal showing={isShowing} background={modalBackground}>
        <p>{modalMessage}</p>
        <RestartButton onClick={restartGame}>Restart</RestartButton>
      </Modal>

      <Title>Minesweeper</Title>
      <StatusBar flagsLeft={flagsLeft} wins={winCount} losses={lossCount} />
      <Board
        board={board}
        onCellClick={handleClick}
        onCellRightClick={handleRightClick}
      />
    </MiddleOfScreen>
  );
};

export default Game;
