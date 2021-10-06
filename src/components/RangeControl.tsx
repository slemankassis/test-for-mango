import styled from 'styled-components';

const RangeControl = styled.div`
  cursor: grab;
  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;
  background-color: #000;
  transform: translate(-50%, 0);
  transition: width 0.25s, height 0.25s;
  touch-action: none;

  &:hover {
    width: 2.25em;
    height: 2.25em;
  }

  &:active {
    cursor: grabbing;
  }
`;

export default RangeControl;
