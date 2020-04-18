import React, { useState } from "react";
import styled from "styled-components";
import { BlockValue } from "../types";

const Cover = styled.div`
  background-color: hsla(235, 7%, 80%, 1);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  cursor: pointer;
  opacity: ${(p: { uncovered: boolean }) => (p.uncovered ? 0 : 1)};
  transition: opacity 0.5s;
`;

export const Block: React.FC<{ uncovered: boolean; value: BlockValue }> = ({
  uncovered,
  value,
  children,
}) => {
  return (
    <>
      <Cover uncovered={uncovered} />
      {children}
    </>
  );
};

export default Block;
