import React, { useState } from "react";
import styled from "styled-components";

import { setupBoard, initialize2dArray } from "../utils";
import CoverUp from "./CoverUp";

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
  const [size, setSize] = useState({ width: 10, height: 10 });
  const [bottomLayer, setField] = useState<number[][]>(
    setupBoard(
      initialize2dArray({ ...size, fillWith: 0 }),
      Math.floor(size.width * size.height * 0.2) // Start with 20% of board as bombs
    )
  );
  const [flags, setFlags] = useState([[]]);

  const handleClick = (
    e: React.MouseEvent,
    cell: { content: number; row: number; col: number }
  ) => {
    if (cell.content === -1) {
      alert("BOOM!");
    }
  };
  return (
    <MiddleOfScreen>
      <Grid>
        <tbody>
          {bottomLayer.map((row, row_i) => (
            <GridRow key={row_i}>
              {row.map((cell, cell_i) => (
                <GridItem
                  key={cell_i}
                  onClick={(e) =>
                    handleClick(e, { content: cell, row: row_i, col: cell_i })
                  }
                >
                  <CoverUp />
                  {cell ? cell : ""}
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
