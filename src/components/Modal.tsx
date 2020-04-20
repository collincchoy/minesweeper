import React from "react";
import styled from "styled-components";

type ModalProps = {
  showing: boolean;
  background: string;
};

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  width: 300px;
  height: 150px;
  background-color: ${(p: ModalProps) => p.background};
  border-radius: 20px;
  box-shadow: 5px 5px 3px grey;
  display: ${(p: { showing: boolean }) => (p.showing ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Modal: React.FC<ModalProps> = (props) => {
  return <StyledModal {...props}>{props.children}</StyledModal>;
};

export default Modal;
