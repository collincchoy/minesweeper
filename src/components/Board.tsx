import React, { useState } from "react";
import styled from "styled-components";

const Grid = styled.table`
  width: 500px;
  height: 500px;
  background-color: gray;
  border: 1px solid black;
  border-spacing: 0px;
`;

const GridRow = styled.tr`
  border: 1px solid black;
`;

const GridItem = styled.td`
  border: 1px solid black;
  text-align: center;
`;

const Board = () => {
  // Board is a size x size square grid.
  const [size, setSize] = useState(10);
  const [field, setField] = useState<number[][]>(
    Array.from(Array(size), () => new Array(size).fill(0))
  );
  console.dir(field);
  const [flags, setFlags] = useState([[]]);
  return (
    <div>
      <Grid>
        <tbody>
          {field.map((row, i) => (
            <GridRow key={i}>
              {row.map((cell, i) => (
                <GridItem key={i}>{cell}</GridItem>
              ))}
            </GridRow>
          ))}
        </tbody>
      </Grid>
    </div>
  );
};

export default Board;
