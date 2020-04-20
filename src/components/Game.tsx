import React, { useState } from "react";
import styled from "styled-components";

import { uncoverBlock, flagBlock, setupBoard } from "../utils";
import { BlockType, BlockValue, Bomb, DifficultyLevel } from "../types";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import StatusBar from "./StatusBar";
import Board from "./Board";
import Button from "./Button";
import DifficultyMap, { defaultConfig } from "../difficulties";

const MiddleOfScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 500px;
`;

const Title = styled.h1`
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: center;
`;

const RestartButton = styled(Button)`
  background-color: aquamarine;
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

  const [difficultyLevel, setDifficultyLevel] = useState(DifficultyLevel.EASY);
  const { size, bombCount } =
    DifficultyMap.get(difficultyLevel) ?? defaultConfig;
  const changeDifficulty = (level: DifficultyLevel) => {
    const config = DifficultyMap.get(level);
    if (config !== undefined) {
      setDifficultyLevel(level);
      restartGame(config.size, config.bombCount);
    }
  };

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

  const restartGame = (
    size: { width: number; height: number },
    bombCount: number
  ) => {
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

  const handleCellClick = (e: React.MouseEvent, block: BlockType) => {
    const { board: newBoard, recoveredFlags } = uncoverBlock(board, block);
    setBoard(newBoard);
    setFlagsLeft(flagsLeft + recoveredFlags);
    if (block.value === BlockValue.BOMB) {
      endGame(false);
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, block: BlockType) => {
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
      <Container>
        <Modal showing={isShowing} background={modalBackground}>
          <p>{modalMessage}</p>
          <RestartButton onClick={() => restartGame(size, bombCount)}>
            Restart
          </RestartButton>
        </Modal>

        <Title>Minesweeper</Title>
        <StatusBar
          flagsLeft={flagsLeft}
          wins={winCount}
          losses={lossCount}
          currentDifficulty={difficultyLevel}
          onClickChangeDifficulty={changeDifficulty}
        />
        <Board
          board={board}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />
      </Container>
    </MiddleOfScreen>
  );
};

export default Game;
