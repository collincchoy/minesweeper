import React from "react";
import styled from "styled-components";
import { BlockType } from "../types";
import Block from "./Block";

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

const Board: React.FC<{
  board: BlockType[][];
  onCellClick: (e: React.MouseEvent, block: BlockType) => void;
  onCellRightClick: (e: React.MouseEvent, block: BlockType) => void;
}> = ({ board, onCellClick, onCellRightClick }) => {
  return (
    <Grid>
      <tbody>
        {board.map((row, row_i) => (
          <GridRow key={row_i}>
            {row.map((block, cell_i) => (
              <GridItem
                key={cell_i}
                onClick={(e) => onCellClick(e, block)}
                onContextMenu={(e) => onCellRightClick(e, block)}
              >
                <Block {...block} />
              </GridItem>
            ))}
          </GridRow>
        ))}
      </tbody>
    </Grid>
  );
};

export default Board;
