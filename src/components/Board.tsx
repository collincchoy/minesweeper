import React, { useState } from "react";
import styled from "styled-components";

import { setupBoard, initialize2dArray, uncoverBlock } from "../utils";
import Block from "./Block";
import { BlockType } from "../types";

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

const Board = () => {
  const [size] = useState({ width: 10, height: 10 });
  const [field, setField] = useState<BlockType[][]>(
    setupBoard(
      initialize2dArray(size.width, size.height, (row, col) => ({
        uncovered: false,
        value: 0,
        position: { row, col },
      })),
      Math.floor(size.width * size.height * 0.2) // Start with 20% of board as bombs
    )
  );

  const handleClick = (e: React.MouseEvent, block: BlockType) => {
    setField((fieldState) => {
      return uncoverBlock(fieldState, block);
    });
  };
  return (
    <MiddleOfScreen>
      <Grid>
        <tbody>
          {field.map((row, row_i) => (
            <GridRow key={row_i}>
              {row.map((block, cell_i) => (
                <GridItem key={cell_i} onClick={(e) => handleClick(e, block)}>
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
