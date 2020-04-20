import React from "react";
import styled from "styled-components";

const StyledStatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledStatusText = styled.span`
  margin-left: 1rem;
  margin-right: 1rem;
`;

const StatusBar: React.FC<{
  flagsLeft: number;
  wins: number;
  losses: number;
}> = ({ flagsLeft, wins, losses }) => {
  return (
    <StyledStatusBar>
      <StyledStatusText>Flags Left: {flagsLeft}</StyledStatusText>
      <StyledStatusText>W: {wins}</StyledStatusText>
      <StyledStatusText>L: {losses}</StyledStatusText>
    </StyledStatusBar>
  );
};

export default StatusBar;
