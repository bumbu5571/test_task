import styled from "styled-components";

export const StyledLine = styled.div<TypeLine>`
  position: absolute;
  top: 480px;
  width: 100%;
  height: 1px;
  background-color: var(--border-opacity);
  opacity: 100%;
  transform: rotate(${({ rotate }) => rotate || 0}deg);
`;

type TypeLine = {
  rotate?: number;
}

export default function Line({rotate = 0}: TypeLine) {
  return (
    <StyledLine rotate={rotate} />
  )
}
