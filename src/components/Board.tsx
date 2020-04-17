import React, { useState } from "react";
import styled from "styled-components";

import { setupBoard } from "../utils";

const Grid = styled.table`
  width: 500px;
  height: 500px;
  background-color: hsla(235, 7%, 80%, 1);
  border: 1px solid black;
  border-spacing: 0px;
`;

const GridRow = styled.tr`
  border: 1px solid black;
`;

// TODO: Make size of each tile dynamic to total grid size
const GridItem = styled.td`
  border: 1px solid black;
  text-align: center;
  width: 10%;
  height: 10%;
`;

const Board = () => {
  // Board is a size x size square grid.
  const [size, setSize] = useState(10);
  const [field, setField] = useState<number[][]>(
    setupBoard(
      Array.from(Array(size), () => new Array(size).fill(0)),
      Math.floor(size * size * 0.2) // Start with 20% of board as bombs
    )
  );
  const [flags, setFlags] = useState([[]]);
  return (
    <div>
      <Grid>
        <tbody>
          {field.map((row, i) => (
            <GridRow key={i}>
              {row.map((cell, i) => (
                <GridItem key={i}>{cell ? cell : ""}</GridItem>
              ))}
            </GridRow>
          ))}
        </tbody>
      </Grid>
    </div>
  );
};

export default Board;
