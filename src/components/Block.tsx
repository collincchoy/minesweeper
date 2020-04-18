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

const ColoredNumber = styled.span`
  color: ${(p: { value: number }) =>
    p.value === 1 ? "green" : p.value === 2 ? "blue" : "red"};
`;

export const Block: React.FC<{ uncovered: boolean; value: BlockValue }> = ({
  uncovered,
  value,
}) => {
  const renderValue = () => {
    switch (value) {
      case BlockValue.BOMB:
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      case BlockValue.EMPTY:
        return <span></span>;
      default:
        return <ColoredNumber value={value}>{value}</ColoredNumber>;
    }
  };
  return (
    <>
      <Cover uncovered={uncovered} />
      {renderValue()}
    </>
  );
};

export default Block;
