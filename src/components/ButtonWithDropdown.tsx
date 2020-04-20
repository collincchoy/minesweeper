import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledDropdown = styled.div`
  position: absolute;
  background-color: lightslategray;
  z-index: 700;
  display: flex;
  flex-direction: column;
`;

const ClickableOption = styled(Button)`
  padding: 2px;
  border-radius: 0px;
  width: 100%;

  &:hover {
    background-color: darkgray;
  }
`;

type ButtonWithDropdownProps = {
  as: any;
  text: string;
  options: string[];
  handleSelectOption?: (selected: string) => void;
};

const ButtonWithDropdown: React.FC<ButtonWithDropdownProps> = (props) => {
  const { text, options, handleSelectOption } = props;
  const [active, setActive] = useState(false);

  const handleOptionClick = (option: string) => {
    handleSelectOption && handleSelectOption(option);
    setActive(false);
  };
  return (
    <Wrapper>
      {/* {props.as ?? <Button>Click me</Button>} */}
      <props.as onClick={() => setActive(!active)}>{text}</props.as>
      {active && (
        <StyledDropdown>
          {options.map((option) => (
            <ClickableOption
              onClick={() => handleOptionClick(option)}
              key={option}
            >
              {option}
            </ClickableOption>
          ))}
        </StyledDropdown>
      )}
    </Wrapper>
  );
};

export default ButtonWithDropdown;
