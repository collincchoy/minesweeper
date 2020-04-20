import React from "react";
import styled from "styled-components";
import Button from "./Button";
import DifficultyMap from "../difficulties";
import { DifficultyLevel } from "../types";
import ButtonWithDropdown from "./ButtonWithDropdown";

const StyledStatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const ChangeDifficultyButton = styled(Button)`
  padding: 0.3em;
  background-color: cyan;
  &:hover {
    background-color: #34f1f1;
  }
`;

const StatusBar: React.FC<{
  flagsLeft: number;
  wins: number;
  losses: number;
  currentDifficulty: DifficultyLevel;
  onClickChangeDifficulty: (level: DifficultyLevel) => void;
}> = ({
  flagsLeft,
  wins,
  losses,
  currentDifficulty,
  onClickChangeDifficulty,
}) => {
  return (
    <StyledStatusBar>
      <div>
        <span>Difficulty: {currentDifficulty}</span>
        <ButtonWithDropdown
          as={ChangeDifficultyButton}
          text="change"
          options={[...DifficultyMap.keys()]}
          handleSelectOption={(option: string) =>
            onClickChangeDifficulty(option as DifficultyLevel)
          }
        ></ButtonWithDropdown>
      </div>
      <span>Flags Left: {flagsLeft}</span>
      <span>W: {wins}</span>
      <span>L: {losses}</span>
    </StyledStatusBar>
  );
};

export default StatusBar;
