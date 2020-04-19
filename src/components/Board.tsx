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
import { BlockType, GridPosition } from "../types";

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

const Board = () => {
  const [size] = useState({ width: 10, height: 10 });
  const [bombs, setBombs] = useState<Bomb[]>([]);
  const [field, setField] = useState<BlockType[][]>(() => {
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
    const { board: withbombs, bombs: placedBombs } = placeBombs(
      initialBoard,
      Math.floor(size.width * size.height * 0.2) // Start with 20% of board as bombs
    );
    const bombs: Bomb[] = [];
    placedBombs.forEach((position) =>
      bombs.push({
        position: convert1dTo2d(position, size.width, size.height),
        flagged: false,
      })
    );
    setBombs(bombs);
    initialBoard = addMarkers(withbombs);
    return initialBoard;
  });

  const handleClick = (e: React.MouseEvent, block: BlockType) => {
    setField((fieldState) => {
      return uncoverBlock(fieldState, block);
    });
  };

  const handleRightClick = (e: React.MouseEvent, block: BlockType) => {
    e.preventDefault();
    setField((fieldState) => {
      // right click
      return flagBlock(fieldState, block);
    });
    setBombs((bomb) =>
      bomb.map((bomb) => {
        if (
          block.position.row === bomb.position.row &&
          block.position.col === bomb.position.col
        ) {
          return { ...bomb, flagged: !bomb.flagged };
        }
        return bomb;
      })
    );
  };

  console.log(bombs);
  return (
    <MiddleOfScreen>
      <Grid>
        <tbody>
          {field.map((row, row_i) => (
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

export default Board;
