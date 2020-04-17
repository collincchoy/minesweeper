import React, { useState } from "react";
import styled from "styled-components";

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

const CoverUp = () => {
  const [uncovered, setUncovered] = useState(false);

  return <Cover uncovered={uncovered} onClick={() => setUncovered(true)} />;
};

export default CoverUp;
