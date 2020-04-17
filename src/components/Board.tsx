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

const GridRow = styled.tr`
  border: 1px solid black;
`;

// TODO: Make size of each tile dynamic to total grid size
const GridItem = styled.td`
  border: 0.5px solid black;
  text-align: center;
  width: 10%;
  height: 10%;
`;

const BottomLayer = styled.div`
  position: relative;
`;

const TopLayer = styled.div`
  position: absolute;
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
  const [topLayer, setTopLayer] = useState(
    initialize2dArray({ ...size, fillWith: 0 })
  );
  const [flags, setFlags] = useState([[]]);
  return (
    <MiddleOfScreen>
      <BottomLayer>
        <Grid>
          <tbody>
            {bottomLayer.map((row, i) => (
              <GridRow key={i}>
                {row.map((cell, i) => (
                  <GridItem key={i}>{cell ? cell : ""}</GridItem>
                ))}
              </GridRow>
            ))}
          </tbody>
        </Grid>
      </BottomLayer>
      <TopLayer>
        <Grid>
          <tbody>
            {topLayer.map((row, i) => (
              <GridRow key={i}>
                {row.map((cell, i) => (
                  <GridItem key={i}>
                    <CoverUp />
                  </GridItem>
                ))}
              </GridRow>
            ))}
          </tbody>
        </Grid>
      </TopLayer>
    </MiddleOfScreen>
  );
};

export default Board;
