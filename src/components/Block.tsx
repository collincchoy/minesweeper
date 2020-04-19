import React from "react";
import styled, { keyframes } from "styled-components";
import { BlockValue, BlockType } from "../types";

type CoverProps = {
  uncovered: boolean;
};
const Cover = styled.div`
  background-color: hsla(235, 7%, 80%, 1);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  top: 0%;
  left: 0%;
  cursor: pointer;
  opacity: ${(p: CoverProps) => (p.uncovered ? 0 : 1)};
  transition: opacity ${(p: CoverProps) => (p.uncovered ? "0.5s" : "0s")};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: hsl(235, 7%, 60%);
  }
`;

const Bomb = styled.span.attrs({
  role: "img",
})`
  &::after {
    content: "💣";
  }
`;

const explode = keyframes`
  from {
    content: "💣";
  }
  to {
    content: "💥";
  }
`;

const ExplodingBomb = styled(Bomb)`
  &::after {
    animation: 1s ${explode} infinite both;
  }
`;

const Flag = styled.span.attrs({
  role: "img",
})`
  &::after {
    font-size: 1.5rem;
    content: "🏴‍☠️";
  }
`;

const ColoredNumber = styled.span`
  color: ${(p: { value: number }) =>
    p.value === 1 ? "green" : p.value === 2 ? "blue" : "red"};
`;

export const Block: React.FC<BlockType> = ({ uncovered, value, flagged }) => {
  const renderValue = () => {
    switch (value) {
      case BlockValue.BOMB:
        return uncovered ? (
          <ExplodingBomb aria-label="bomb-go-boom" />
        ) : (
          <Bomb aria-label="bomb" />
        );
      case BlockValue.EMPTY:
        return <span></span>;
      default:
        return <ColoredNumber value={value}>{value}</ColoredNumber>;
    }
  };
  return (
    <>
      <Cover uncovered={uncovered}>{flagged && <Flag />}</Cover>
      {renderValue()}
    </>
  );
};

export default Block;
