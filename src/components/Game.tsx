import React, { useState } from "react";
import styled from "styled-components";

import { uncoverBlock, flagBlock, setupBoard } from "../utils";
import { BlockType, BlockValue, Bomb, DifficultyLevel } from "../types";
import useModal from "../hooks/useModal";
import StatusBar from "./StatusBar";
import Board from "./Board";
import DifficultyMap, { defaultConfig } from "../difficulties";
import GameModal from "./GameModal";

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

const Game = () => {
  const { isShowing, showModal, clearModal, success } = useModal();
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const endGame = (won: boolean) => {
    if (won) {
      setWinCount(winCount + 1);
      showModal(true);
    } else {
      setLossCount(lossCount + 1);
      showModal(false);
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
        <GameModal
          isShowing={isShowing}
          success={success}
          handleRestart={() => restartGame(size, bombCount)}
          showNext={success && difficultyLevel !== DifficultyLevel.HARD}
          handleNext={() => {
            if (difficultyLevel === DifficultyLevel.EASY) {
              changeDifficulty(DifficultyLevel.MEDIUM);
            } else if (difficultyLevel === DifficultyLevel.MEDIUM) {
              changeDifficulty(DifficultyLevel.HARD);
            }
          }}
        />

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
