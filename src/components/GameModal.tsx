import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "./Button";

enum ModalColor {
  SUCCESS = "#35c575",
  FAILURE = "#c54545",
}

const ButtonGroup = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-around;
`;

const RestartButton = styled(Button)`
  background-color: aquamarine;
  &:hover {
    background-color: #72e2bd;
  }
`;

const NextLevelButton = styled(Button)`
  background-color: orange;
  &:hover {
    background-color: #e49400;
  }
`;

const GameModal: React.FC<{
  isShowing: boolean;
  success: boolean;
  handleRestart: () => void;
  showNext: boolean;
  handleNext: () => void;
}> = ({ isShowing, success, handleRestart, showNext, handleNext }) => {
  const message = success ? "You got 'em all! You win!" : "💥BOOM!!!💥";
  return (
    <Modal
      showing={isShowing}
      background={success ? ModalColor.SUCCESS : ModalColor.FAILURE}
    >
      <p>{message}</p>
      <ButtonGroup>
        <RestartButton onClick={handleRestart}>Restart</RestartButton>
        {showNext && (
          <NextLevelButton onClick={handleNext}>Next</NextLevelButton>
        )}
      </ButtonGroup>
    </Modal>
  );
};

export default GameModal;
