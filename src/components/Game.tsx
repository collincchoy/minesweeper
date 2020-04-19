import React, { useState } from "react";
import styled from "styled-components";

import {
  placeBombs,
  initialize2dArray,
  uncoverBlock,
  flagBlock,
  addMarkers,
  convert1dTo2d,
} from "../utils";
import Block from "./Block";
import { BlockType, GridPosition, BlockValue } from "../types";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

const Grid = styled.table`
  width: 500px;
  height: 500px;
  border: 1px solid black;
  border-spacing: 0px;
`;

const GridRow = styled.tr``;

// TODO: Make size of each tile dynamic to total grid size
const GridItem = styled.td`
  border: 0.5px solid black;
  text-align: center;
  width: 10%;
  height: 10%;
  position: relative;
  overflow: hidden;
`;

const MiddleOfScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

type Bomb = {
  position: GridPosition;
  flagged: boolean;
};

const Game = () => {
  const { isShowing, showModal, modalMessage, modalBackground } = useModal();
  const endGame = (won: boolean) => {
    if (won) {
      showModal("You got them all! You win!", true);
    } else {
      showModal("BOOM!", false);
    }
  };

  const [size] = useState({ width: 5, height: 5 });
  const [bombs, setBombs] = useState<Bomb[]>([]);
  const [board, setBoard] = useState<BlockType[][]>(() => {
    let initialBoard = initialize2dArray(
      size.width,
      size.height,
      (row, col) => ({
        uncovered: false,
        value: 0,
        position: { row, col },
        flagged: false,
      })
    );
    const { board: withBombs, bombs: placedBombs } = placeBombs(
      initialBoard,
      Math.floor(size.width * size.height * 0.2) // Start with 20% of board as bombs
    );
    const bombs: Bomb[] = [];
    placedBombs.forEach((position) => {
      bombs.push({
        position: convert1dTo2d(position, size.width, size.height),
        flagged: false,
      });
    });
    setBombs(bombs);
    initialBoard = addMarkers(withBombs);
    return initialBoard;
  });

  const handleClick = (e: React.MouseEvent, block: BlockType) => {
    const newBoard = uncoverBlock(board, block);
    setBoard(newBoard);
    if (block.value === BlockValue.BOMB) {
      endGame(false);
    }
  };

  const handleRightClick = (e: React.MouseEvent, block: BlockType) => {
    e.preventDefault();
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
      <Modal
        showing={isShowing}
        message={modalMessage}
        background={modalBackground}
      />
      <Grid>
        <tbody>
          {board.map((row, row_i) => (
            <GridRow key={row_i}>
              {row.map((block, cell_i) => (
                <GridItem
                  key={cell_i}
                  onClick={(e) => handleClick(e, block)}
                  onContextMenu={(e) => handleRightClick(e, block)}
                >
                  <Block {...block} />
                </GridItem>
              ))}
            </GridRow>
          ))}
        </tbody>
      </Grid>
    </MiddleOfScreen>
  );
};

export default Game;